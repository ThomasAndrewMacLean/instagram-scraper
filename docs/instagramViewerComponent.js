console.log('Starting...');

const URL =
    'https://3n88q8n0eb.execute-api.eu-west-1.amazonaws.com/latest/instagram/';

class InstagramViewer extends HTMLElement {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.counter = 0;
        this.loading = true;
        this.setupInstagramViewer();
        this.image = document.createElement('img');
        this.paragraph = document.createElement('p');
        this.image.id = 'instagramViewerId';
        const wrapper = document.createElement('div');
        wrapper.innerHTML = '<h2>Testing</h2>';
        wrapper.appendChild(this.image);
        wrapper.appendChild(this.paragraph);
        this.appendChild(wrapper);
        this.addEventListener('click', this.handleClick);
    }

    handleClick() {
        if (this.loading) return;
        this.counter = (this.counter + 1) % this.data.length;
        this.setDataAndPic();
    }
    
    setupInstagramViewer() {
        fetch(URL + this.account)
            .then(dataJson => dataJson.json())
            .then(data => {
                this.data = data;
                this.loading = false;
                this.finishedGettingData();
            });
    }

    finishedGettingData() {
        console.log(this.data);
        this.setDataAndPic();
    }

    setDataAndPic() {
        this.image.src = this.data[this.counter].pic;
        this.paragraph.innerHTML = this.data[this.counter].caption;
    }

    get account() {
        return this.getAttribute('account');
    }
}
window.customElements.define('instagram-viewer', InstagramViewer);
