/**
 * Created by Hamid on 6/2/2016.
 */

const Q = new WeakMap();
const SERVICE =new WeakMap();

class UniqueLinkTitle{
    constructor($q, linksLibrarySrv){
        this.require='ngModel';
        this.restrict='A';

        Q.set(this, $q);
        SERVICE.set(this, linksLibrarySrv);
    }
    link(scope, elem, attrs, ngModelController){
        ngModelController.$asyncValidators.uniqueLinkTitle = function(value){
            return Q.get(UniqueLinkTitle.instance)((resolve, reject) => {
                SERVICE.get(UniqueLinkTitle.instance).checkIfLinkExists(value).then( result => {
                    if(result){
                        reject();
                    }
                    else{
                        resolve();
                    }
                });
           });
        };
    }

    static directiveFactory($q, linksLibrarySrv){
        UniqueLinkTitle.instance = new UniqueLinkTitle($q, linksLibrarySrv);
        return UniqueLinkTitle.instance;
    }
}

    UniqueTitle.directiveFactory.$inject = ['$q', 'linksLibrarySrv'];

let moduleName = 'linksLibrary.directives';

    angular.module(moduleName, [])
        .directive('uniqueLinkTitle', UniqueLinkTitle.directiveFactory);

export default moduleName;

