import { Scene } from "phaser";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  dialogue_text: Phaser.GameObjects.Text;
  gameObjects: Phaser.GameObjects.Image[];

  constructor() {
    super("Game");
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0xffffff);

    this.background = this.add.image(
      this.scene.systems.canvas.width / 2,
      this.scene.systems.canvas.height / 2,
      "background"
    );

    this.dialogue_text = this.add.text(
      this.scene.systems.canvas.width / 2,
      this.scene.systems.canvas.height - 20,
      "",
      {
        fontFamily: "Arial Black",
        fontSize: 24,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "left",
        fixedWidth: this.scene.systems.canvas.width * 0.7,
        wordWrap: {
          width: this.scene.systems.canvas.width * 0.7,
        },
      }
    );
    this.dialogue_text.setOrigin(0.5, 1);
    this.dialogue_text.setVisible(false);

    window.lolGameConfig.gameObjects.forEach((gameObject) => {
      let image = this.add.image(0, 0, gameObject.id, 1536);
      //   !!image && this.gameObjects.push(image);
      !!image && image.setInteractive(this.input.makePixelPerfect());
      !!image && image.setOrigin(0, 0);
      !!image &&
        image.addListener("pointerdown", () => {
          this.dialogue_text.setVisible(true);
          this.children.bringToTop(this.dialogue_text);
          this.dialogue_text.setText(gameObject.dialogue);
          this.time.addEvent({
            delay: 3000,
            loop: false,
            callback: () => {
              if (this.dialogue_text.visible) {
                this.dialogue_text.setVisible(false);
              }
            },
            callbackScope: this,
            loop: true,
          });
        });
    });

    this.input.once("pointerdown", () => {
      //   this.scene.start("GameOver");
    });
  }
}
