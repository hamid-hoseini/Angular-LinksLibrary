import ListController from './Controllers/ListController';
import AddLinksController from './Controllers/AddLinksController';

var moduleName='linksLibrary.controllers';

angular.module(moduleName, [])
    .controller('linksLibrary.linksListCtrl', ListController)
    .controller('linksLibrary.addLinksCtrl', AddLinksController);

export default moduleName;