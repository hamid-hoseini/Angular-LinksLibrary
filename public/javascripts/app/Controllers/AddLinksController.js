/**
 * Created by Hamid on 5/31/2016.
 */
const SERVICE = new WeakMap();
const TIMEOUT = new WeakMap();
let linkData = null;
class AddLinksController{
    constructor($timeout, linksLibrarySrv){
        SERVICE.set(this, linksLibrarySrv);
        TIMEOUT.set(this, $timeout);
        this.link = {};
        this.btnTitle = 'Add Link';
        linkData = SERVICE.get(this).linkData;
        if (linkData){
            this.link.title = linkData.title;
            this.link.subject = linkData.subject;
            this.link.description = linkData.description;
            this.link.linkUrl = linkData.link;
            this.link._id = linkData._id;
            this.btnTitle = 'Edit Link';
        }
    }
    addLinks(){
        if(this.addLinksForm.$valid){
            SERVICE.get(this).addLink(this.link).then(message => {
                this.addSuccess = true;
            TIMEOUT.get(this)(() => {
                this.addSuccess = false;
                }, 2500);
            this.resetForm();
            }, error => {
                this.addFailed = true;
                TIMEOUT.get(this)(() => {
                    this.addFailed = false;
                }, 2500);
            });
        }
    }
    editLink(){
    console.log(2);
    console.log(this.link);
        if(this.addLinksForm.$valid){
            SERVICE.get(this).editLink(this.link).then(message => {
                this.addSuccess = true;
            TIMEOUT.get(this)(() => {
                this.addSuccess = false;
                }, 2500);
            this.resetForm();
            }, error => {
                this.addFailed = true;
                TIMEOUT.get(this)(() => {
                    this.addFailed = false;
                }, 2500);
            });
        }
    }
    resetForm(){
        this.addLinksForm.$setPristine();
        this.addLinksForm.$setUntouched();
        this.link = {};
        SERVICE.get(this).linkData = null;
    }
    operator(){
        if (linkData){
            console.log(1);
            this.editLink()
        } else {
            this.addLinks();
        }
    }
}

AddLinksController.$inject = ['$timeout', 'linksLibrarySrv'];

export default AddLinksController;

