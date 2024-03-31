import { Scene } from "phaser";
import axios from "axios";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
    let data = window.lolGameConfig;
    this.load.image(
      "background",
      `http://127.0.0.1:8787/bg/${data.backgroundImageId}`
    );
    data.gameObjects.forEach((gameObject) => {
      let image = this.load.image(
        gameObject.id,
        `http://127.0.0.1:8787/image/${gameObject.imageId}`
      );
      //   this.load.audio(
      //     gameObject.id,
      //     `http://127.0.0.1:8787/audio/${gameObject.audioId}`
      //   );
    });
    console.info(
      "loading " + `http://127.0.0.1:8787/bg/${data.backgroundImageId}`
    );
  }

  create() {
    this.scene.start("Preloader");
  }
}
