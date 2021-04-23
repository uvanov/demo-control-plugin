class DemoControl {
    constructor(selector, options) {
        this.selector = selector;
        this.options = options;
        this.init();
    }


    init() {
        // Check selector

        if (!document.querySelector(this.selector)) {
            console.error('DemoControl:', `${this.selector} does not exist in document.`)
            return;
        }

        // -----

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



        // Creating template


        let demoControlsWrapper = document.createElement('div');
        demoControlsWrapper.classList.add('demo-controls-wrapper');

        let demoOpenButton = document.createElement('button');
        demoOpenButton.classList.add('demo-open-button');
        demoOpenButton.innerText = 'Управление';

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
        })

        // ----
    }
}

let demo = new DemoControl('body', {
    frameList: [
        { name: "Фрейм 0", id: 0 },
        { name: "Фрейм 1", id: 1 },
        { name: "Фрейм 2", id: 2 }
    ]
});
