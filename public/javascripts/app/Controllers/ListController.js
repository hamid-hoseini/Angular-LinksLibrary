const INIT = new WeakMap();
const SERVICE = new WeakMap();
const TIMEOUT = new WeakMap();
const LOCATION = new WeakMap();

class ListController{
    constructor($timeout, $location, linksLibrarySrv){
        SERVICE.set(this, linksLibrarySrv);
        LOCATION.set(this, $location);
        TIMEOUT.set(this, $timeout);
        INIT.set(this, () => {
            SERVICE.get(this).getLinksList().then(links => {
                this.links = links;
                //console.log(this.links);
            })
        });
        INIT.get(this)();

        this.sortType     = 'title';
        this.sortReverse  = false;
    }

    editLink(linkData){
        SERVICE.get(this).linkData = linkData;
        LOCATION.get(this).path('links/addLinks');
    }
    deleteLink(linkDataId){
        console.log(linkDataId);
        return SERVICE.get(this).deleteLink(linkDataId).then(() => {
            INIT.get(this)();
            this.readSuccess = true;
            this.readSuccessMessage = "Successfully data deleted ...!";
            TIMEOUT.get(this)(() => {
                this.readSuccess = false;
            }, 2500);
        }, error =>{
            this.readSuccess = true;
            this.readSuccessMessage = "There is an error ...!";
            TIMEOUT.get(this)(() => {
                this.readSuccess = false;
            }, 2500);
        });
    }
}

ListController.$inject = ['$timeout', '$location', 'linksLibrarySrv'];

export default ListController;