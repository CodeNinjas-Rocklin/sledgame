function MovePlayer () {
    if (IsDown(Buttons.left)) {
        player.x -= speed
    }
    if (IsDown(Buttons.right)) {
        player.x += speed
    }
    player.x = Clamp(player.x, 0, screen.width)
}
function CreateTrees () {
    if (treesLeft > 0) {
        treeTimer += -1
        if (treeTimer == 0) {
            newTree = sprites.create(list[RandomInt(list.length)], 0)
            newTree.y = screen.height + 30
            trees.push(newTree)
            treesLeft += 0 - 1
            treeTimer = 1000
        }
    }
}
function UpdateTrees () {
    for (let i = 0; i <= trees.length - 1; i++) {
        trees[i].y -= treeSpeed;
if (trees[i].y < -30) {
            trees[i].y = screen.height + 30
            trees[i].x = RandomInt(screen.width)
            info.changeScoreBy(1)
            if (info.score() % pointsForSpeed == 0) {
                treeSpeed += 1
                pointsForSpeed *= 2
            }
        }
        if (iFrames == 0) {
            if (Collision(player, trees[i], .3)) {
                info.changeLifeBy(-1)
                if (info.life() > 0) {
                    iFrames = 50
                }
            }
        }
    }
}
function FlashEffect () {
    if (iFrames > 0) {
        iFrames += -1
        if (iFrames % 5 == 0) {
            if (player.image == blankImage) {
                player.setImage(playerSprite)
            } else {
                player.setImage(blankImage)
            }
        }
    }
}
function SetUp () {
    blankImage = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `
    playerSprite = img`
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
        3 3 3 3 5 5 3 3 3 3 3 3 3 3 3 3
        3 3 3 5 5 5 3 3 3 3 5 5 5 5 3 3
        3 3 3 5 5 5 5 3 3 3 5 5 5 5 3 3
        3 3 3 5 5 5 5 3 3 3 5 5 5 5 3 3
        3 3 3 3 3 5 3 3 3 3 5 5 5 5 3 3
        3 3 3 3 3 3 3 3 3 3 3 5 5 3 3 3
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
        3 3 3 3 5 5 3 3 3 3 3 3 3 3 3 3
        3 3 3 5 5 5 5 5 3 3 3 3 3 3 3 3
        3 3 3 3 5 5 5 5 5 5 3 3 3 3 3 3
        3 3 3 3 3 5 5 5 5 5 5 5 5 3 3 3
        3 3 3 3 3 3 5 5 5 3 3 3 3 3 3 3
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
    `
    player = sprites.create(playerSprite, 0)
    scene.setBackgroundColor(6)
    player.y = 20
    speed = 3
    treeSpeed = 1
    list.push(img`
        . . . . . . . . . . . . . . . . . 7 7 . . . . . . . . . . . . .
        . . . . . . . . . . . . . 7 7 7 7 7 7 7 . . . . . . . . . . . .
        . . . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 . . . . . . . . . . .
        . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . . . . .
        . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . . . .
        . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . . .
        . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . . .
        . . . . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . .
        . . . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . .
        . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 . . 7 7 7 7 7 7 . . . . .
        . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 7 7 7 7 7 7 . . . .
        . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . 7 7 7 7 . . .
        . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . 7 7 . . .
        . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . . . . .
        . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . . . .
        . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . . . .
        . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . .
        . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . 7 7 7 . . . . . .
        . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . 7 7 . . . . .
        . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . . . .
        . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . . . .
        . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . .
        . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . .
        . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . .
        . . 7 . . . . . . . 7 7 7 7 e 7 7 7 7 . . . . . . . . . . . . .
        . . . . . . . . . . 7 7 7 . e e 7 7 7 7 . . . . . . . . . . . .
        . . . . . . . . . 7 7 7 . . e e e 7 7 7 . . . . . . . . . . . .
        . . . . . . . . . 7 7 . . . e e e . 7 7 . . . . . . . . . . . .
        . . . . . . . . 7 7 . . . . e e e . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . e e e . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . e e e . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . e e e . . . . . . . . . . . . . . .
    `)
    info.setScore(0)
    info.setLife(3)
    treesLeft = 5
    pointsForSpeed = 10
}
let playerSprite: Image = null
let blankImage: Image = null
let iFrames = 0
let pointsForSpeed = 0
let newTree: Sprite = null
let treesLeft = 0
let treeTimer = 0
let player: Sprite = null
let treeSpeed = 0
let speed = 0
let trees: Sprite[] = []
let list: Image[] = []
let tree = null
let newTree2 = null
treeTimer = 1
SetUp()
game.onUpdate(function () {
    MovePlayer()
    CreateTrees()
    UpdateTrees()
    FlashEffect()
})
