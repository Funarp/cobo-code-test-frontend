const DISABLE_DIR_ZERO = "left";
const DEBUG = true;

function opposite(dir) {
    switch (dir) {
        case "top": return "bottom";
        case "bottom": return "top";
        case "left": return "right";
        case "right": return "left";
        default:
            break;
    }
}

function directions_count(point) {
    let dis_count = 0;
    for (var key in point) {
        if (!point[key]) { dis_count++ }
    }
    return dis_count;
}

export const solve_maze = function(panel) {
    let end_x = panel.length - 1;
    let end_y = panel[end_x].length - 1;
    let current_x = 0, current_y = 0;
    // solve path
    let path = [[current_x, current_y]]

    let panel_copy = JSON.parse(JSON.stringify(panel));
    panel_copy[0][0][DISABLE_DIR_ZERO] = true;
    while (true) {
        if (current_x == end_x && current_y == end_y) {
            if (DEBUG) {
                console.log(path)
            }
            return path;
        }
        let current_point = panel_copy[current_x][current_y];
        // count avaliable directions
        if (directions_count(current_point) > 0) {
            for (const dir in current_point) {
                if (!current_point[dir]) {
                    current_point[dir] = true;
                    // move
                    switch (dir) {
                        case "top": current_x--; break;
                        case "bottom": current_x++; break;
                        case "left": current_y--; break;
                        case "right": current_y++; break;
                        default: break;
                    }
                    path.push([current_x, current_y]);
                    panel_copy[current_x][current_y][opposite(dir)] = true;
                    break;
                }
            }
        } else {
            if (current_x == 0 && current_y == 0) {
                alert("cannot solve the maze!")
                return;
            }
            // back
            path.pop()
            current_x = path[path.length - 1][0]
            current_y = path[path.length - 1][1]
        }
    }
}