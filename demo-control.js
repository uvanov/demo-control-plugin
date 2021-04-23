class DemoControl {
    constructor(selector, options) {
        this.selector = selector;
        this.options = options;
        this.buttonText = "Control";
        this.init();
    }


    init() {
        // Check selector

        if (!document.querySelector(this.selector)) {
            console.error('DemoControl:', `${this.selector} does not exist in document.`)
            return;
        }
        

        // -----

        // Check if options exist

        if(!this.options){
            console.error('DemoControl:', `Options must be created`)
            return;
        }

        // -----


        // Auto add frame-class

        this.options.frameList.forEach(frame => {
            let id = frame.id;
            if(document.getElementById(`${id}`)){
                document.getElementById(`${id}`).classList.add('demo-controls-frame');
            } else {
                console.error('DemoControl:', `Frame with id ${id} does not exist.`)
                return;
            }
        })

        // Ckeck frameList

        if (!this.options.frameList || !Array.isArray(this.options.frameList)) {
            console.error('DemoControl:', `Frame list must be an array.`);
            return;
        } else {
            if (this.options.frameList.length === 0) {
                console.error('DemoControl:', `Frame list can't be empty.`);
                return;
            }
        }

        // -----

        // Check buttonText

        if(this.options.buttonText){
            this.buttonText = this.options.buttonText;
        }

        // -----


        


        // Creating template


        let demoControlsWrapper = document.createElement('div');
        demoControlsWrapper.classList.add('demo-controls-wrapper');

        let demoOpenButton = document.createElement('button');
        demoOpenButton.classList.add('demo-open-button');
        demoOpenButton.innerText = this.buttonText;

        let demoControls = document.createElement('ul');
        demoControls.classList.add('demo-controls');

        
        function removeAllActives() {
            document.querySelectorAll('.demo-controls-frame').forEach(frame => {
                frame.classList.remove('active');
            })
        }
        
        function addActive(element) {
            element.classList.add('active');
        }


        this.options.frameList.forEach((item, frameIndex) => {
            let li = document.createElement('li');
            li.innerText = item.name;
            li.dataset.open = item.id;
            li.onclick = function () {
                let targetElement = document.getElementById(this.dataset.open);
                if (targetElement !== null) {
                    removeAllActives();
                    addActive(targetElement);
                } else {
                    console.error(`DEMO: Incorrect value in ${frameIndex + 1} object. 
            Element with id ${this.dataset.open} does not exist in document.`);
                }
            }

            demoControls.appendChild(li);
        });

        demoControlsWrapper.appendChild(demoOpenButton);
        demoControlsWrapper.appendChild(demoControls);

        document.addEventListener('DOMContentLoaded', () => {
            document.querySelector(this.selector).append(demoControlsWrapper);

            // Check ButtonPosition

                if(this.options.buttonPosition){
                    if(typeof this.options.buttonPosition === "object"){
                        let wrapperClass = document.querySelector('.demo-controls-wrapper');
                        
                        wrapperClass.style.top = this.options.buttonPosition.top + 'px';
                        wrapperClass.style.left = this.options.buttonPosition.left + 'px';
                    } else {
                        console.error('DemoControl:', `buttonPosition must by an object`);
                        return;
                    }
                }

            // ----
        })

        // ----

        
    }
}

const demka = new DemoControl('body', {
    frameList: [
        {name: 'Фрейм 1', id: 0},
        {name: 'Фрейм 2', id: 1},
        {name: 'Фрейм 3', id: 2}
    ]
});