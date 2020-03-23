import { rander_cells } from './maze'
import { maze_panel } from'./panel'

const app = rander_cells(20, 20)
document.body.appendChild(app);

const rows = document.getElementsByClassName('row');
const panel = maze_panel();
let current = {
    'x': 0,
    'y': 0
}
function move(dir) {
    let x = current.x
    let y = current.y
    if (x == y && y == 0 && dir == "left") {
        alert("Don't leave Earth!")
        return;
    }
    if (x == y && y == panel.length - 1 && dir == "right") {
        alert("Bingo!");
        return;
    }
    if (!panel[x][y][dir]) {
        rows[x].children[y].classList.remove('rat')
        switch (dir) {
            case "top":
                x--; break;
            case "bottom":
                x++; break;
            case "left":
                y--; break;
            case "right":
                y++; break;
            default:
                break;
        }
        rows[x].children[y].classList.add('rat')
        current.x = x;
        current.y = y;
        return;
    } else {
        return;
    }
}

document.onkeydown = function (e) {
    let checkIE = (document.all) ? true : false;
    let key;
    if (checkIE) {
        key = window.event.keyCode;
    } else {
        key = e.which;
    }
    switch (key) {
        case 38:
            move("top"); break;
        case 40:
            move("bottom"); break;
        case 37:
            move("left"); break;
        case 39:
            move("right"); break;
        default:
            break;
    }
};