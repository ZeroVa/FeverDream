import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.binary('background', 'http://127.0.0.1:8787/image/123', Uint8Array)

        this.load.on('filecomplete-binary-background', function (key, type, data) {
            var buffer = new Uint8Array(this.cache.binary.get('background'));
            var blob = new Blob([buffer], { type: "image/png" });
            var url = window.URL.createObjectURL(blob);
            this.load.image('background', url);
            this.load.once('filecomplete-image-background', function () {
                window.URL.revokeObjectURL(url);
            })
        }, this);
        // this.load.image({
        //     key: 'background',
        //     extension: 'png',
        //     // xhrSettings: {
        //     //     responseType: 'blob',
        //     //     async: true,
        //     // }
        // }, 'http://127.0.0.1:8787/image/123');
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
