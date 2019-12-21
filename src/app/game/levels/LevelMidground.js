import { Container, Graphics } from 'pixi.js';
import * as colors from '../../core/display/Colors.js';

import { GameController } from '../GameController.js';
import { Subtitle } from '../../core/display/Subtitle.js';
import { Node } from '../../core/display/Node.js';

export class LevelMidground extends Container {
  constructor(GameController) {
    super();
    let w = GameController.canvas.width;
    let h = GameController.canvas.height;

    let lvl = GameController.levels.level;
    lvl = GameController.assets.levels[lvl];
    
    this.message = new Subtitle(colors.secondaryTitle, lvl.message, w, h);
    this.message.x = w / 2;
    this.message.y = h / 10 * 2;
    this.message.enable();
    this.addChild(this.message);

    this.nodes = [];

    for (let i = 0; i < lvl.nodes.length; i++) {
      let node = new Node(GameController.assets, lvl.nodes[i].type);
      node.x = w / (lvl.x + 1) * lvl.nodes[i].x;
      node.y = h / (lvl.y + 2) * (lvl.nodes[i].y + 1);
      node.scale.set(1/(lvl.y + 1) * 2);

      node.buttonMode = true;
      node.interactive = true;

      node.on('pointertap', () => {
        if (!node.selected)
          for (let j = 0; j < this.nodes.length; j++)
            if (this.nodes[j].selected)
              this.nodes[j].select();

        node.select();
      });
      node.on('rightclick', () => {
        if (!node.increase()) {
          console.log("Max Connections!");
        };
      })

      this.addChild(node);
      this.nodes.push(node);
    }

  }


}
