window.onload = () => {
    function applyStyle(style, element) {
        for (const key in style) {
            element.style[key] = style[key]
        }
    }

    document.body.innerHTML = ""
    applyStyle({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#333"
    }, document.body)

    const board = document.createElement("div")
    applyStyle({
        border: "4px #ccc solid",
        height: "80vh",
        width: "40vh",
        display: "grid",
        gridTemplateColumns: "repeat(10, 1fr)",
        gridTemplateRows: "repeat(20, 1fr)"
    }, board)
    document.body.appendChild(board)

    function Square(color) {
        this._element = document.createElement("div")
        applyStyle({
            backgroundColor: color.background,
            borderColor: color.border,
            borderWidth: "4px",
            borderTopStyle: "solid",
            borderBottomStyle: "solid",
            borderLeftStyle: "solid",
            borderRightStyle: "solid"
        }, this._element)
        board.appendChild(this._element)

        this.moveTo = (x, y) => {
            this._x = x;
            this._y = y;
            applyStyle({gridColumn: this._x, gridRow: this._y}, this._element)
        }

        this.moveTo(-1, -1);
    }

    let palette = {
        cyan: { background: "#05a18a", border: "#04e3d0" },
        blue: { background: "#0549a1", border: "#0474e3" },
        orange: { background: "#a13c05", border: "#e35204" },
        yellow: { background: "#a17d05", border: "#e3af04" },
        green: { background: "#15a105", border: "#2de304" },
        magenta: { background: "#9105a1", border: "#c504e3" },
        red: { background: "#a10505", border: "#e30404" }
    }

    new Square(palette.cyan).moveTo(3, 3)
    new Square(palette.blue).moveTo(5, 3)
    new Square(palette.orange).moveTo(7, 3)
    new Square(palette.yellow).moveTo(3, 5)
    new Square(palette.green).moveTo(5, 5)
    new Square(palette.magenta).moveTo(7, 5)
    new Square(palette.red).moveTo(3, 7)
}