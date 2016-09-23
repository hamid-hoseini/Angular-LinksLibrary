/**
 * Created by Hamid on 5/30/2016.
 */
var moduleName = 'linksLibrary.services';
const HTTP = new WeakMap();

class LinksLibraryService{
    constructor($http){
        HTTP.set(this, $http);
        this._linkData = null;
    }

    get linkData() {
        return this._linkData;
    }
    set linkData(value){
        this._linkData = value;
        console.log(value);
    }
    getLinksList(){
        return HTTP.get(this).get('/links/linksList').then( result => result.data);
    }
    addLink(link){
        return HTTP.get(this).post('/links/addLink', link).then( result => result.data);
    }
    editLink(link){
        return HTTP.get(this).put('/links/editLink',link).then( result => result.data);
    }
    deleteLink(linkId){
        console.log(linkId);
        return HTTP.get(this).delete('/links/deleteLink/'+linkId).then( result => result.data);
    }

    static linksLibraryFactory($http){
        return new LinksLibraryService($http);
    }
}

LinksLibraryService.linksLibraryFactory.$inject = ['$http'];

angular.module(moduleName, [])
    .factory('linksLibrarySrv', LinksLibraryService.linksLibraryFactory);

export default moduleName;