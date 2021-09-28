/*global app, jasmine, describe, it, beforeEach, expect */

describe("controller", function () {
  "use strict";

  var subject, model, view;

  var setUpModel = function (todos) {
    model.read.and.callFake(function (query, callback) {
      callback = callback || query;
      callback(todos);
    });

    model.getCount.and.callFake(function (callback) {
      var todoCounts = {
        active: todos.filter(function (todo) {
          return !todo.completed;
        }).length,
        completed: todos.filter(function (todo) {
          return !!todo.completed;
        }).length,
        total: todos.length,
      };

      callback(todoCounts);
    });

    model.remove.and.callFake(function (id, callback) {
      callback();
    });

    model.create.and.callFake(function (title, callback) {
      callback();
    });

    model.update.and.callFake(function (id, updateData, callback) {
      callback();
    });
  };

  var createViewStub = function () {
    var eventRegistry = {};
    return {
      render: jasmine.createSpy("render"),
      bind: function (event, handler) {
        eventRegistry[event] = handler;
      },
      trigger: function (event, parameter) {
        eventRegistry[event](parameter);
      },
    };
  };

  beforeEach(function () {
    model = jasmine.createSpyObj("model", [
      "read",
      "getCount",
      "remove",
      "create",
      "update",
    ]);
    view = createViewStub();
    subject = new app.Controller(model, view);
  });

  it("should show entries on start-up", function () {
    // TODO: write test
    var todo = { title: "my todo" };
    setUpModel([todo]);

    subject.setView("");

    expect(view.render).toHaveBeenCalledWith("showEntries", [todo]);
  });

  describe("routing", function () {
    it("should show all entries without a route", function () {
      var todo = { title: "my todo" };
      setUpModel([todo]);

      subject.setView("");

      expect(view.render).toHaveBeenCalledWith("showEntries", [todo]);
    });

    it('should show all entries without "all" route', function () {
      var todo = { title: "my todo" };
      setUpModel([todo]);

      subject.setView("#/");

      expect(view.render).toHaveBeenCalledWith("showEntries", [todo]);
    });

    it("should show active entries", function () {
      // TODO: write test
      var activeTodo = { title: "my active todo", completed: false };
      setUpModel([activeTodo]);

      subject.setView("#/active");

      expect(model.read).toHaveBeenCalledWith(
        { completed: false },
        jasmine.anything()
      );

      expect(view.render).toHaveBeenCalledWith("showEntries", [activeTodo]);
    });

    it("should show completed entries", function () {
      // TODO: write test
      var completedTodo = { title: "my completed todo", completed: true };
      setUpModel([completedTodo]);

      subject.setView("#/completed");

      // EXPECT THAT CONTROLLER IS ASKING THE MODEL FOR COMPLETED TODOS
      expect(model.read).toHaveBeenCalledWith(
        { completed: true },
        jasmine.anything()
      );

      expect(view.render).toHaveBeenCalledWith("showEntries", [completedTodo]);
    });
  });

  it("should show the content block when todos exists", function () {
    setUpModel([{ title: "my todo", completed: true }]);

    subject.setView("");

    expect(view.render).toHaveBeenCalledWith("contentBlockVisibility", {
      visible: true,
    });
  });

  it("should hide the content block when no todos exists", function () {
    setUpModel([]);

    subject.setView("");

    expect(view.render).toHaveBeenCalledWith("contentBlockVisibility", {
      visible: false,
    });
  });

  it("should check the toggle all button, if all todos are completed", function () {
    setUpModel([{ title: "my todo", completed: true }]);

    subject.setView("");

    expect(view.render).toHaveBeenCalledWith("toggleAll", {
      checked: true,
    });
  });

  it('should set the "clear completed" button', function () {
    // We are creating a dummy/example todo
    var todo = { id: 42, title: "my todo", completed: true };
    // We are telling the model to give that dummy/example todo to the controller
    setUpModel([todo]);

    // We are changing the URL
    subject.setView("");

    // Because we passed a dummy/example todo which is completed, then we expect the "clear completed" button to be shown
    expect(view.render).toHaveBeenCalledWith("clearCompletedButton", {
      completed: 1,
      visible: true,
    });

    /*
      expect(view.render).toHaveBeenCalledWith(argument1, argument2, argument3, ...)
      We expect that view.render was called with arguments

      This test will pass if the function is called like this by controller:
      view.render("clearCompletedButton", { completed: 1, visible: true })

      We are expecting that the above code ran in the controller.

      If that code did not run, then the test will fail. Because we want to test that "clear completed" was shown.
    */
  });

  it('should highlight "All" filter by default', function () {
    // TODO: write test

    var todo = { title: "my todo" };
    setUpModel([todo]);

    // We are changing the URL
    subject.setView("");

    expect(view.render).toHaveBeenCalledWith("setFilter", "");
  });

  it('should highlight "Active" filter when switching to active view', function () {
    // TODO: write test

    var todo = { title: "my todo" };

    setUpModel([todo]);

    // We are changing the URL
    subject.setView("#/active");

    expect(view.render).toHaveBeenCalledWith("setFilter", "active");
  });

  describe("toggle all", function () {
    it("should toggle all todos to completed", function () {
      // TODO: write test
      var firstTodo = { id: 2, title: "my todo" };
      var secondTodo = { id: 3, title: "my todo3" };
      setUpModel([firstTodo, secondTodo]);

      // We are changing the URL
      subject.setView("");

      view.trigger("toggleAll", { completed: true });

      expect(model.update).toHaveBeenCalledWith(
        2,
        { completed: true },
        jasmine.anything()
      );
      expect(model.update).toHaveBeenCalledWith(
        3,
        { completed: true },
        jasmine.anything()
      );
    });

    it("should update the view", function () {
      // TODO: write test
      var firstTodo = { id: 2, title: "my todo" };
      var secondTodo = { id: 3, title: "my todo3" };
      setUpModel([firstTodo, secondTodo]);

      // We are changing the URL
      subject.setView("");

      view.trigger("toggleAll", { completed: true }); //simulation of user action

      expect(view.render).toHaveBeenCalledWith("showEntries", [
        firstTodo,
        secondTodo,
      ]);
    });
  });

  describe("new todo", function () {
    it("should add a new todo to the model", function () {
      // TODO: write test
      setUpModel([]);

      subject.setView("");

      view.trigger("newTodo", "a new todo"); //we simulate that the user is doing a newTodo, and we add this title ("a new todo")

      expect(model.create).toHaveBeenCalledWith(
        "a new todo",
        jasmine.anything()
      );
    });

    it("should add a new todo to the view", function () {
      setUpModel([]);

      subject.setView("");

      view.render.calls.reset();
      model.read.calls.reset();
      model.read.and.callFake(function (callback) {
        callback([
          {
            title: "a new todo",
            completed: false,
          },
        ]);
      });

      view.trigger("newTodo", "a new todo");

      expect(model.read).toHaveBeenCalled();

      expect(view.render).toHaveBeenCalledWith("showEntries", [
        {
          title: "a new todo",
          completed: false,
        },
      ]);
    });

    it("should clear the input field when a new todo is added", function () {
      setUpModel([]);

      subject.setView("");

      view.trigger("newTodo", "a new todo");

      expect(view.render).toHaveBeenCalledWith("clearNewTodo");
    });
  });

  describe("element removal", function () {
    it("should remove an entry from the model", function () {
      // TODO: write test
      var todo = { id: 42, title: "my old todo", completed: true };
      setUpModel([]);

      subject.setView("");

      view.trigger("itemRemove", { id: 42 }); //we simulate that the user is doing a ...., and we add this title ("a new todo")

      expect(model.remove).toHaveBeenCalledWith(42, jasmine.anything());
    });

    it("should remove an entry from the view", function () {
      var todo = { id: 42, title: "my todo", completed: true };
      setUpModel([todo]);

      subject.setView("");
      view.trigger("itemRemove", { id: 42 });

      expect(view.render).toHaveBeenCalledWith("removeItem", 42);
    });

    it("should update the element count", function () {
      var todo = { id: 42, title: "my todo", completed: true };
      setUpModel([todo]);

      subject.setView("");
      view.trigger("itemRemove", { id: 42 });

      expect(view.render).toHaveBeenCalledWith("updateElementCount", 0);
    });
  });

  describe("remove completed", function () {
    it("should remove a completed entry from the model", function () {
      var todo = { id: 42, title: "my todo", completed: true };
      setUpModel([todo]);

      subject.setView("");
      view.trigger("removeCompleted");

      expect(model.read).toHaveBeenCalledWith(
        { completed: true },
        jasmine.any(Function)
      );
      expect(model.remove).toHaveBeenCalledWith(42, jasmine.any(Function));
    });

    it("should remove a completed entry from the view", function () {
      var todo = { id: 42, title: "my todo", completed: true };
      setUpModel([todo]);

      subject.setView("");
      view.trigger("removeCompleted");

      expect(view.render).toHaveBeenCalledWith("removeItem", 42);
    });
  });

  describe("element complete toggle", function () {
    it("should update the model", function () {
      var todo = { id: 21, title: "my todo", completed: false };
      setUpModel([todo]);
      subject.setView("");

      view.trigger("itemToggle", { id: 21, completed: true });

      expect(model.update).toHaveBeenCalledWith(
        21,
        { completed: true },
        jasmine.any(Function)
      );
    });

    it("should update the view", function () {
      var todo = { id: 42, title: "my todo", completed: true };
      setUpModel([todo]);
      subject.setView("");

      view.trigger("itemToggle", { id: 42, completed: false });

      expect(view.render).toHaveBeenCalledWith("elementComplete", {
        id: 42,
        completed: false,
      });
    });
  });

  describe("edit item", function () {
    it("should switch to edit mode", function () {
      var todo = { id: 21, title: "my todo", completed: false };
      setUpModel([todo]);

      subject.setView("");

      view.trigger("itemEdit", { id: 21 });

      expect(view.render).toHaveBeenCalledWith("editItem", {
        id: 21,
        title: "my todo",
      });
    });

    it("should leave edit mode on done", function () {
      var todo = { id: 21, title: "my todo", completed: false };
      setUpModel([todo]);

      subject.setView("");

      view.trigger("itemEditDone", { id: 21, title: "new title" });

      expect(view.render).toHaveBeenCalledWith("editItemDone", {
        id: 21,
        title: "new title",
      });
    });

    it("should persist the changes on done", function () {
      var todo = { id: 21, title: "my todo", completed: false };
      setUpModel([todo]);

      subject.setView("");

      view.trigger("itemEditDone", { id: 21, title: "new title" });

      expect(model.update).toHaveBeenCalledWith(
        21,
        { title: "new title" },
        jasmine.any(Function)
      );
    });

    it("should remove the element from the model when persisting an empty title", function () {
      var todo = { id: 21, title: "my todo", completed: false };
      setUpModel([todo]);

      subject.setView("");

      view.trigger("itemEditDone", { id: 21, title: "" });

      expect(model.remove).toHaveBeenCalledWith(21, jasmine.any(Function));
    });

    it("should remove the element from the view when persisting an empty title", function () {
      var todo = { id: 21, title: "my todo", completed: false };
      setUpModel([todo]);

      subject.setView("");

      view.trigger("itemEditDone", { id: 21, title: "" });

      expect(view.render).toHaveBeenCalledWith("removeItem", 21);
    });

    it("should leave edit mode on cancel", function () {
      var todo = { id: 21, title: "my todo", completed: false };
      setUpModel([todo]);

      subject.setView("");

      view.trigger("itemEditCancel", { id: 21 });

      expect(view.render).toHaveBeenCalledWith("editItemDone", {
        id: 21,
        title: "my todo",
      });
    });

    it("should not persist the changes on cancel", function () {
      var todo = { id: 21, title: "my todo", completed: false };
      setUpModel([todo]);

      subject.setView("");

      view.trigger("itemEditCancel", { id: 21 });

      expect(model.update).not.toHaveBeenCalled();
    });
  });
});
