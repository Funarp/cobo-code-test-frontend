let maze_panel = () => {
    const rows = document.getElementsByClassName('row');
    const value = { top: false, left: false, bottom: false, right: false };
    let panel = [];
    for (let row of rows) {
        const nodes = row.children;
        let eachRow = [];
        for (let node of nodes) {
            const borders = node.classList.value.split(' ').filter(className => ['top', 'left', 'right', 'bottom'].indexOf(className) != -1)
            const borderMap = {}
            borders.forEach(line => borderMap[line] = true)
            eachRow.push(Object.assign({}, value, borderMap))
        }
        panel.push(eachRow)
    }
    console.log(JSON.stringify(panel))
    return panel
}

export {maze_panel}