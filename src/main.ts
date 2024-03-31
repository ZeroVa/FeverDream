import { Boot } from "./scenes/Boot";
import { Game as MainGame } from "./scenes/Game";
import { GameOver } from "./scenes/GameOver";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";
import axios from "axios";
import { Game, Types } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1536,
  height: 1536,
  parent: "game-container",
  backgroundColor: "#028af8",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
};

async function startGame() {
  let { data } = await axios.get("http://127.0.0.1:8787/game");
  window.lolGameConfig = data;
  console.log("HERE IS DATA " + data);
  console.info(data);

  //   data.gameObjects.forEach((gameObject) => {
  //     this.load.image(
  //       gameObject.name,
  //       `http://127.0.0.1:8787/image/${gameObject.imageId}`
  //     );
  //   });
  return new Game(config);
}

export default startGame();
