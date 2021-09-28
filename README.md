# todo-list-app : Reprenez et améliorez un projet existant 

Dans le monde professionnel, on est souvent amené à reprendre un projet existant. Que faire quand vous vous retrouvez avec le code de quelqu'un d'autre ? Comment l'améliorer ? Voilà un savoir-faire qui vous sera très utile au quotidien !

En effet, faire un projet de bout en bout est "facile" : on connaît son fonctionnement sur le bout des doigts. En revanche, on se rend vite compte qu'il est plus dur de reprendre le travail de quelqu'un d'autre... surtout quand il n'a pas de tests !

Vous venez d'intégrer une petite équipe qui pense que tous les problèmes du monde viennent du fait que les gens ne sont pas assez organisés et qu'un peu de focus pourrait tout changer ! C'est pourquoi ils ont créé ce qu'ils appellent la meilleur application "to-do list" du monde. L'idée elle-même est très bien mais le code derrière n'est pas au top ! Ils vous ont sollicité pour ajouter des tests et régler quelques bugs dans le code.

Vous pouvez télécharger le code du projet en cliquant sur ce lien : 

Regardez comment il est structuré et essayez de comprendre comment il fonctionne. Votre mission sera de corriger des bugs, ajouter des tests, et optimiser sa performance.

À vous de faire la meilleur application 
À vous de faire la meilleur application "to-do list" au monde !
Il n'est pas nécessaire d'avoir votre code en ligne dans le cadre de ce projet. Cependant, si vous souhaitez construire votre portfolio professionnel et héberger le projet en ligne, notre partenaire 1&1 IONOS offre 2 mois d'hébergement gratuits aux étudiants pour toute souscription à un pack d'hébergement (plus d'infos).

**Etape 1 : Corrigez les bugs** 📝
--------------------------------

Il y a deux bugs dans le code et c'est votre mission de les trouver ! Voici quelques indices:

Le premier est une faute de frappe.
Le deuxième introduit un conflit éventuel entre deux IDs identiques.
Vous allez chercher ces bugs dans le code, un peu comme dans "Où est Charlie". Une fois les bugs trouvés, corrigez-les ! Ils empêchent le code de marcher correctement (pour l'instant ce n'est même pas possible d'ajouter des tâches à la liste à cause de ces bugs).

Il y a également des améliorations à faire, même s'il ne s'agit pas de bugs proprement dit. Essayez de trouver où vous pouvez optimiser des boucles et vérifiez s'il y a des fonctions qui affichent des informations dans la console de déboggage  qui ne sont pas nécessaires.

**Etape 2 : où sont les tests ?!** 🧐
--------------------------------

Vous allez voir que ce projet a déjà quelques tests mais largement pas assez ! Pour le prendre en main, vous allez ajouter tous les tests unitaires et fonctionnels  pertinents que vous pouvez. L'objectif est de solidifier le projet. Ainsi, lorsque vous le modifierez par la suite, vous pourrez vous baser sur ces tests pour vérifier que vous ne "cassez" rien.

Cette étape peut paraître un peu longue et fastidieuse, mais elle est nécessaire pour gagner beaucoup de temps et éviter des surprises à l'avenir !

Il est nécessaire d'utiliser la commande  npm install  pour installer tous les fichiers Jasmine.

Il y a déjà un fichier existant pour les tests de ce projet :  ControllerSpec.js .  À l'intérieur de ce fichier, quelques tests à ajouter sont indiqués dans le code. Ils sont indiqués avec le commentaire suivant :

// TODO: write test
Plus précisément, vous pouvez les trouver sur les lignes #62, #86, #90, #137, #141, #146, #150, #156, et #196 de  ControllerSpec.js .

Vous pouvez aller plus loin et ajouter des tests supplémentaires si vous le voulez !

Astuce : gagnez du temps en adoptant la méthode TDD. Comme beaucoup de développeur·ses, si vous rédigez vos tests et corrigez des bugs en même temps, vous pouvez utiliser des tests pour identifier ce qui ne fonctionne pas - ce qui accélère la correction des bugs.

**Etape 3 : optimisez la performance** ↗️
--------------------------------
Votre équipe vous a demandé d'analyser la performance d'un site concurrent pour identifier ce qui marche bien et ce qui ne marche pas, au cas où vous décidez de "scaler" votre propre application. Voici le site du concurrent.

Utilisez la console de développement de votre navigateur pour analyser la performance du site. Faites attention aux ressources utilisées par les différents éléments du site (par exemple, ce qui est lent, ce qui est rapide, etc) et aux ressources utilisées par les publicités sur le site et celles utilisées pour effectuer les fonctionnalités "To-do" pour la liste elle-même.

Maintenant, vous allez faire un audit de performance. En vous appuyant sur les données, écrivez un document de 300 à 500 mots qui décrit la performance du site, comment il se distingue de votre application, et comment optimiser la performance en vue d'un éventuel "scaling" de votre application.

**Etape 4 : améliorez le projet** 🤠
--------------------------------

Maintenant que vous connaissez ce code par cœur, vous pouvez facilement ajouter des informations supplémentaires à votre documentation. Vous êtes désormais prêt à écrire de la documentation technique ! Jetez un œil aux exemples suivants pour vous inspirer.

Pour le dire plus simplement, il faut documenter les éléments suivants :

- le projet lui-même (l'usage non technique)
- comment il fonctionne techniquement
- votre audit
Vous pouvez utiliser le format que vous souhaitez (ex. un wiki sur Github, un document en format texte, etc).

Livrables
La base de code mise à jour avec les améliorations et les tests
La documentation technique de votre projet, y compris votre audit, sous le format que vous souhaitez
