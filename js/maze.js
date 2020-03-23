export const rander_cells = function (x, y) {
    let points = cale(maze(x, y))
    let cells = document.createElement('div')
    cells.setAttribute('id', 'cells')
    for (let i = 0; i < points.length; i++) {
        let row = document.createElement('div')
        row.setAttribute('class', 'row')
        for (let j = 0; j < points[i].length; j++) {
            let cell = document.createElement('div')
            if (i == j && j == 0) {
                cell.setAttribute('class', `${gen_class(points[i][j])} rat`)
            } else {
                cell.setAttribute('class', `${gen_class(points[i][j])}`)
            }
            row.appendChild(cell)
        }
        cells.appendChild(row)
    }
    return cells
}

function maze(x, y) {
    let n = x * y - 1;
    if (n < 0) { alert("illegal maze dimensions"); return; }
    let horiz = []; for (let j = 0; j < x + 1; j++) horiz[j] = [];
    let verti = []; for (let j = 0; j < x + 1; j++) verti[j] = [];
    let here = [Math.floor(Math.random() * x), Math.floor(Math.random() * y)];
    let path = [here];
    let unvisited = [];
    for (let j = 0; j < x + 2; j++) {
        unvisited[j] = [];
        for (let k = 0; k < y + 1; k++)
            unvisited[j].push(j > 0 && j < x + 1 && k > 0 && (j != here[0] + 1 || k != here[1] + 1));
    }
    while (0 < n) {
        let potential = [[here[0] + 1, here[1]], [here[0], here[1] + 1],
        [here[0] - 1, here[1]], [here[0], here[1] - 1]];
        let neighbors = [];
        for (let j = 0; j < 4; j++)
            if (unvisited[potential[j][0] + 1][potential[j][1] + 1])
                neighbors.push(potential[j]);
        if (neighbors.length) {
            n = n - 1;
            let next = neighbors[Math.floor(Math.random() * neighbors.length)];
            unvisited[next[0] + 1][next[1] + 1] = false;
            if (next[0] == here[0])
                horiz[next[0]][(next[1] + here[1] - 1) / 2] = true;
            else
                verti[(next[0] + here[0] - 1) / 2][next[1]] = true;
            path.push(here = next);
        } else
            here = path.pop();
    }
    return { x: x, y: y, horiz: horiz, verti: verti };
}


function cale(maze) {
    let points = []
    for (let i = 0; i < maze.x; i++) {
        let temp = []
        for (let j = 0; j < maze.y; j++) {
            let data = {
                top: false,
                bottom: false,
                left: false,
                right: false
            }
            if (i == 0) {
                data.top = true;
            }
            else if (i == maze.x - 1) {
                data.bottom = true;
            }
            if (j == 0) {
                data.left = true;
            } else if (j == maze.y - 1) {
                data.right = true;
            }
            temp.push(data)
        }
        points.push(temp)
    }
    points[0][0].left = false;
    points[maze.x - 1][maze.y - 1].right = false;
    for (let i = 0; i < maze.x; i++) {
        for (let j = 0; j < maze.y - 1; j++) {
            if (!maze.horiz[i][j]) {
                points[i][j].right = true;
                points[i][j + 1].left = true;
            }
        }
    }
    for (let i = 0; i < maze.y - 1; i++) {
        for (let j = 0; j < maze.x; j++) {
            if (!maze.verti[i][j]) {
                points[i][j].bottom = true;
                points[i + 1][j].top = true;
            }
        }
    }
    return points
}

function gen_class(point) {
    let temp = ""
    for (let key in point) {
        if (point[key]) {
            temp += `${key} `
        }
    }
    temp += "cell"
    return temp
}
