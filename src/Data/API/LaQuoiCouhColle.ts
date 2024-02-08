/**
 * Gang shit
 * @remarks Le nom c'est la faute de Kassandra, et j'ai pas de volonté
 */
export class LaQuoiCouhColle {
  public static laTetrissance() {
    function shiny(style: Record<string, string | number>, element: HTMLElement) {
      for (const key in style) {
        (element.style as any)[key] = style[key]
      }
    }

    function lnk(href: string, rel: string, type: string) {
      const link = document.createElement('link')
      link.setAttribute('href', href)
      link.setAttribute('rel', rel)
      link.setAttribute('type', type)
      document.getElementsByTagName('head')[0].appendChild(link)
    }

    lnk('https://fonts.googleapis.com/css2?family=Martian+Mono&display=swap', 'stylesheet', 'text/css')

    document.body.innerHTML = ''
    shiny({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#333',
      margin: '0'
    }, document.body)

    const l = document.createElement('div')
    shiny({
      border: '4px #ccc solid',
      height: '80vh',
      width: '40vh',
      display: 'grid',
      gridTemplateColumns: 'repeat(10, 1fr)',
      gridTemplateRows: 'repeat(20, 1fr)',
      boxSizing: 'border-box'
    }, l)
    document.body.appendChild(l)

    const r = document.createElement('div')
    shiny({
      height: '80vh',
      width: '24vh',
      marginLeft: '30px'
    }, r)
    document.body.appendChild(r)

    const ballin = document.createElement('div')
    shiny({
      border: '4px #ccc solid',
      fontFamily: 'Martian Mono',
      padding: '10px',
      textAlign: 'right',
      color: '#ccc',
      fontSize: '20pt'
    }, ballin)
    ballin.innerText = '0'
    r.appendChild(ballin)

    type Sq = {
      _e: HTMLDivElement,
      _x: number,
      _y: number,
      mv: (x: number, y: number) => void,
      x: () => number,
      y: () => number,
      d: (h?: number) => void,
      ss: (w: number, lp: LP) => boolean,
      s: (w: number) => void,
      l: (lp: LP) => boolean,
      c: () => void,
      rm: () => void,
    }

    const $Sq = function(this: Sq, c: C) {
      this._e = document.createElement('div')
      shiny({
        backgroundColor: c.bg,
        borderColor: c.bd,
        borderWidth: '4px',
        borderTopStyle: 'solid',
        borderBottomStyle: 'solid',
        borderLeftStyle: 'solid',
        borderRightStyle: 'solid'
      }, this._e)
      l.appendChild(this._e)

      this.mv = (x, y) => {
        this._x = x
        this._y = y
        shiny({
          gridColumn: this._x,
          gridRow: 21 - this._y,
          display: this._y > 20 ? 'none' : 'block'
        }, this._e)
      }

      this.x = () => this._x

      this.y = () => this._y

      this.d = (h = 1) => this.mv(this._x, this._y - h)

      this.ss = (w, lp) => {
        return !out(this._x + w, this._y) && !lp.sqX(this._x + w, this._y)
      }

      this.s = (w) => this.mv(this._x + w, this._y)

      this.l = (lp) => this._y === 1 || lp.sqX(this._x, this._y - 1)

      this.c = () => {
        shiny({
          backgroundColor: rainbow.w.bg,
          borderColor: rainbow.w.bd
        }, this._e)
      }

      this.rm = () => this._e.remove()


      this.mv(0, 21)
    } as unknown as new(c: C) => Sq

    type C = { bg: string, bd: string }

    let rainbow = {
      c: { bg: '#05a18a', bd: '#04e3d0' },
      b: { bg: '#0549a1', bd: '#0474e3' },
      o: { bg: '#a13c05', bd: '#e35204' },
      y: { bg: '#a17d05', bd: '#e3af04' },
      g: { bg: '#15a105', bd: '#2de304' },
      m: { bg: '#9105a1', bd: '#c504e3' },
      r: { bg: '#a10505', bd: '#e30404' },
      w: { bg: '#a9a9a9', bd: '#e8e8e8' }
    }

    function out(x: number, y: number): boolean {
      return x < 1 || x > 10 || y < 0
    }

    type MvP = {
      _t: number,
      _l: number,
      _o: number,
      _rd: RD,
      _wkd: WKD
      _lp: LP
      _sqs: Sq[]
      spw: () => void
      rot: (cw: boolean) => void
      s: (r: boolean) => void
      wL?: (p: MvP) => void
      d: () => boolean
      HD: () => void
      l: () => boolean
    }

    type RD = { x: number, y: number }[][]

    type WKD = {}[]

    const $MvP = function(this: MvP, c: C, rd: RD, wkd: WKD, lp: LP) {
      this._t = 22
      this._l = 4
      this._o = -1
      this._rd = rd
      this._wkd = wkd
      this._lp = lp
      this._sqs = new Array(4).fill(null).map(_ => new $Sq(c))

      this.spw = () => this.rot(true)

      this.rot = (cw) => {
        if (cw) {
          this._o = (this._o + 1) % 4
        } else {
          this._o = (this._o + 3) % 4
        }

        const npos = this._rd[this._o].map(dcl => ({
          x: this._l + dcl.x, y: this._t - dcl.y
        }))

        if (!npos.some(pos => out(pos.x, pos.y) || this._lp.sqX(pos.x, pos.y))) {
          this._sqs.forEach((sq, i) => sq.mv(npos[i].x, npos[i].y))
        }
      }

      this.s = (r) => {
        const w = r ? 1 : -1
        if (this._sqs.every(sq => sq.ss(w, this._lp))) {
          this._l += w
          this._sqs.forEach(sq => sq.s(w))
        }
      }

      this.wL = undefined

      this.d = () => {
        const l = this.l()

        if (l) {
          this._lp.lck(...this._sqs)
          this._sqs = []
          if (this.wL) this.wL(this)
        } else {
          this._t--
          this._sqs.forEach(sq => sq.d())
        }

        return l
      }

      this.HD = () => {
        while (!this.d()) {
        }
      }

      this.l = () => this._sqs.some(sq => sq.l(this._lp))
    } as unknown as new(c: C, rd: RD, wkd: WKD, lp: LP) => MvP


    type LL = {
      _sqs: (Sq | null)[]
      _y: number
      _c: boolean
      sqX: (x: number) => boolean
      sq: (x: number) => Sq
      lck: (square: Sq) => void
      e: () => boolean
      cc: () => boolean
      c: () => boolean
      ddd: (y: number) => void
    }

    function ntm(why: string): never {
      throw Error(why)
    }

    const $LL = function(this: LL, y: number) {
      this._sqs = new Array(10).fill(null)
      this._y = y
      this._c = false

      this.sqX = (x) => {
        return this._sqs[x - 1] !== null
      }

      this.sq = (x) => {
        return this._sqs[x - 1] ?? ntm('Square not found')
      }

      this.lck = (sq) => {
        return this._sqs[sq.x() - 1] = sq
      }

      this.e = () => {
        return this._sqs.every(sq => sq === null)
      }

      this.cc = () => {
        this._c = this._sqs.every(sq => sq !== null)
        if (this._c) {
          this._sqs.forEach(sq => sq?.c())
        }
        return this._c
      }

      this.c = () => {
        let c = false

        if (this._c) {
          this._sqs.forEach(sq => sq?.rm())
          this._sqs = new Array(10).fill(null)
          this._c = false
          c = true
        }

        return c
      }

      this.ddd = (y) => {
        if (y !== this._y) {
          const h = this._y - y
          this._y = y
          this._sqs.forEach(sq => sq?.d(h))
        }
      }
    } as unknown as new(y: number) => LL

    type LP = {
      _l: LL[]
      sqX: (x: number, y: number) => boolean
      sq: (x: number, y: number) => Sq
      lck: (...squares: Sq[]) => void
      aaaaaahhhhhhhhh: () => boolean
      cc: () => boolean
      c: () => number
    }

    const $LP = function(this: LP) {
      this._l = new Array(22).fill(null).map((_, i) => new $LL(i + 1))

      this.sqX = (x, y) => {
        return this._l[y - 1].sqX(x)
      }

      this.sq = (x, y) => {
        return this._l[y - 1].sq(x)
      }

      this.lck = (...z) => {
        z.forEach(sq => {
          this._l[sq.y() - 1].lck(sq)
        })
      }

      this.aaaaaahhhhhhhhh = () => !this._l[20].e() || !this._l[21].e()

      this.cc = () => {
        let cc = false

        for (let yi = 0; yi < 20; yi++) {
          if (this._l[yi].cc()) {
            cc = true
          }
        }

        return cc
      }

      this.c = () => {
        let lc = 0

        for (let yi = 19; yi >= 0; yi--) {
          if (this._l[yi].c()) {
            lc++
            const kazuyaMishima = this._l.splice(yi, 1)[0]
            this._l.push(kazuyaMishima)
          }
        }
        for (let yi = 0; yi < 22; yi++) {
          this._l[yi].ddd(yi + 1)
        }

        return lc
      }
    } as unknown as new() => LP

    type CFPF___ = (...args: any[]) => MvP

    type PF = {
      _c: Map<string, CFPF___>
      a: (ptdr: string, pc: CFPF___) => void
      mk: (ptdr: string, lp: LP) => MvP
    }

    const $PF = function(this: PF) {
      this._c = new Map()

      this.a = (ptdr, pc) => {
        this._c.set(ptdr, pc)
      }

      this.mk = (ptdr, lp) => {
        return (this._c.get(ptdr) ?? ntm('invalid piece type'))(lp)
      }
    } as unknown as new() => PF

    const usineAGaz = new $PF()

    function rot(sq1x: number, sq1y: number, sq2x: number, sq2y: number, ethan: number, sq3y: number, sq4x: number, sq4y: number): {
      x: number,
      y: number
    }[] {
      return [
        { x: sq1x, y: sq1y },
        { x: sq2x, y: sq2y },
        { x: ethan, y: sq3y },
        { x: sq4x, y: sq4y }
      ]
    }

    usineAGaz.a('I', (...args: [LP]) => {
      return new $MvP(
        rainbow.c,
        [
          rot(0, 1, 1, 1, 2, 1, 3, 1),
          rot(2, 0, 2, 1, 2, 2, 2, 3),
          rot(0, 2, 1, 2, 2, 2, 3, 2),
          rot(1, 0, 1, 1, 1, 2, 1, 3)
        ],
        [],
        ...args
      )
    })

    usineAGaz.a('J', (...args: [LP]) => {
      return new $MvP(
        rainbow.b,
        [
          rot(0, 0, 0, 1, 1, 1, 2, 1),
          rot(2, 0, 1, 0, 1, 1, 1, 2),
          rot(2, 2, 2, 1, 1, 1, 0, 1),
          rot(0, 2, 1, 2, 1, 1, 1, 0)
        ],
        [],
        ...args
      )
    })

    usineAGaz.a('L', (...args: [LP]) => {
      return new $MvP(
        rainbow.o,
        [
          rot(2, 0, 0, 1, 1, 1, 2, 1),
          rot(2, 2, 1, 0, 1, 1, 1, 2),
          rot(0, 2, 2, 1, 1, 1, 0, 1),
          rot(0, 0, 1, 2, 1, 1, 1, 0)
        ],
        [],
        ...args
      )
    })

    usineAGaz.a('O', (...args: [LP]) => {
      return new $MvP(
        rainbow.y,
        [
          rot(1, 0, 2, 0, 1, 1, 2, 1),
          rot(1, 0, 2, 0, 1, 1, 2, 1),
          rot(1, 0, 2, 0, 1, 1, 2, 1),
          rot(1, 0, 2, 0, 1, 1, 2, 1)
        ],
        [],
        ...args
      )
    })

    usineAGaz.a('S', (...args: [LP]) => {
      return new $MvP(
        rainbow.g,
        [
          rot(0, 1, 1, 1, 1, 0, 2, 0),
          rot(1, 0, 1, 1, 2, 1, 2, 2),
          rot(2, 1, 1, 1, 1, 2, 0, 2),
          rot(1, 2, 1, 1, 0, 1, 0, 0)
        ],
        [],
        ...args
      )
    })

    usineAGaz.a('T', (...args: [LP]) => {
      return new $MvP(
        rainbow.m,
        [
          rot(1, 0, 0, 1, 1, 1, 2, 1),
          rot(2, 1, 1, 0, 1, 1, 1, 2),
          rot(1, 2, 2, 1, 1, 1, 0, 1),
          rot(0, 1, 1, 2, 1, 1, 1, 0)
        ],
        [],
        ...args
      )
    })

    usineAGaz.a('Z', (...args: [LP]) => {
      return new $MvP(
        rainbow.r,
        [
          rot(2, 1, 1, 1, 1, 0, 0, 0),
          rot(1, 2, 1, 1, 2, 1, 2, 0),
          rot(0, 1, 1, 1, 1, 2, 2, 2),
          rot(1, 0, 1, 1, 0, 1, 0, 2)
        ],
        [],
        ...args
      )
    })

    type RPG = {
      _bf: string[]
      p: () => string
      d: () => void
      pd: () => void
    }

    const $RPG = function(this: RPG) {
      const randint = (n: number) => Math.floor(Math.random() * n)

      this._bf = []

      this.p = () => {
        if (this._bf.length === 0) this.d()
        return this._bf.shift() ?? ntm('bruh')
      }

      this.d = () => {
        let gud = ['I', 'J', 'L', 'O', 'S', 'T', 'Z']
        let bad = []

        for (let n = 7; n > 0; n--) {
          let i = randint(n)
          bad.push(gud.splice(i, 1)[0])
        }

        this._bf = bad
      }

      this.pd = () => this._bf = []
    } as unknown as new() => RPG

    const rpg = new $RPG()

    type GamingChair = {
      _lp: LP
      _bg: number
      _sd: boolean
      _gd: number
      _sss: number
      _ci: number
      _gaming: boolean
      _w: number
      _clk: number
      _cp: MvP
      p: () => void
      d: (ev: KeyboardEvent) => void
      u: (ev: KeyboardEvent) => void
      g: () => number
      i: (w: number) => void
      s: (l: number) => void
      t: () => void
      l: (pvm: MvP) => void
      vs_y: () => void
      ahahah_t_trop_nul: () => void
    }

    const $GG = function(this: GamingChair) {
      const H = 0.1 // 0.015
      const S = 0.35
      const R = 4
      const C = 4

      this._lp = new $LP()
      this._bg = H
      this._sd = false
      this._gd = 0
      this._sss = 0
      this._ci = -1
      this._gaming = false
      this._w = 0

      this.p = () => {
        this._cp = usineAGaz.mk(rpg.p(), this._lp)
        this._cp.wL = this.l.bind(this)
        this._cp.spw()
      }

      function noBalls<R>(func: () => R): () => R
      function noBalls<R, P1>(func: (p1: P1) => R): (p1: P1) => R
      function noBalls<R>(func: (...args: any[]) => R) {
        return function(...args: any[]) {
          // @ts-ignore stfu
          if (this._gaming) func.apply(this, args)
        }
      }

      this.d = noBalls((ev: KeyboardEvent) => {
        switch (ev.code) {
          case 'ArrowUp':
          case 'KeyX':
            if (!ev.repeat) this._cp.rot(true)
            break

          case 'ControlLeft':
          case 'KeyZ':
            if (!ev.repeat) this._cp.rot(false)
            break

          case 'ArrowLeft':
          case 'KeyA':
            if (!ev.repeat || this._sss < R) {
              this._cp.s(false)
              this._sss = 0
            } else {
              this._sss++
            }
            break

          case 'ArrowRight':
          case 'KeyD':
            if (!ev.repeat || this._sss < R) {
              this._cp.s(true)
              this._sss = 0
            } else {
              this._sss++
            }
            break

          case 'Space':
            if (!ev.repeat) this._cp.HD()
            break

          case 'ArrowDown':
            this._sd = true
            break
        }
      })

      this.u = noBalls((ev: KeyboardEvent) => {
        switch (ev.code) {
          case 'ArrowDown':
            this._sd = false
            break
        }
      })

      this.g = () => {
        return this._sd ? S : this._bg
      }

      this.i = (w) => {
        this._w += w
        ballin.innerText = `${this._w}`
      }

      this.s = (l) => {
        switch (l) {
          case 1:
            this.i(100)
            break
          case 2:
            this.i(300)
            break
          case 3:
            this.i(500)
            break
          case 4:
            this.i(800)
            break
        }
      }

      this.t = noBalls(() => {
        if (this._ci >= 0) {
          if (--this._ci < 0) {
            this.s(this._lp.c())
            this.p()
          }
        }

        if (this._gd > 1) {
          this._cp.d()
          this._gd = 0
        }
        this._gd += this.g()
      })

      this.l = (piece) => {
        if (this._lp.aaaaaahhhhhhhhh()) {
          this.ahahah_t_trop_nul()
        } else {
          if (this._lp.cc()) {
            this._ci = C
          } else {
            this.p()
          }
        }
      }

      this.vs_y = () => {
        this._gaming = true
        this._clk = window.setInterval(this.t.bind(this), 25)
        rpg.pd()
        this.p()
      }

      this.ahahah_t_trop_nul = () => {
        console.log('Game Over')
        this._gaming = false
        window.clearInterval(this._clk)
      }

      document.body.addEventListener('keydown', this.d.bind(this))
      document.body.addEventListener('keyup', this.u.bind(this))
    } as unknown as new() => GamingChair

    const gg = new $GG()
    gg.vs_y()
  }
}
