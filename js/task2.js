import { rander_cells } from './maze'
import { maze_panel } from'./panel'
import { solve_maze } from './solve'
const app = rander_cells(20, 20)
document.body.appendChild(app);

const rows = document.getElementsByClassName('row');
const panel = maze_panel();
const path = solve_maze(panel);

let path_count = 0;
let timer_num = 0;
function solve_one_step() {
    if(path_count < path.length){
        let value = path[path_count];
        rows[value[0]].children[value[1]].classList.add('rat');
        path_count++;
    }else{
        if(timer_num != 0){
            window.clearInterval(timer_num)
        }
    }
}

function solve_all() {
    if(path_count < path.length){
        document.onkeydown = undefined
        timer_num = setInterval(solve_one_step,300)
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
        case 83: // press 's' for one step
            solve_one_step();break;
        case 13:
            solve_all();break;
        default:
            break;
    }
};