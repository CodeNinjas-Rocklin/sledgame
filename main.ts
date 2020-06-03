function MovePlayer () {
    if (IsDown(Buttons.left)) {
        player.x -= speed
    }
    if (IsDown(Buttons.right)) {
        player.x += speed
    }
    player.x = Clamp(player.x, 0, screen.width)
}
function UpdateCoins () {
    for(let i = 0; i < coins.length; )
    {
        coins[i].y -= treeSpeed
        if(i == 0 && coins[i].y < -5)
        {
            coins.shift().destroy()
        }
        else
        {
            if(coins[i].kind() == 0 && Collision(player, coins[i], 1))
            {
                info.changeScoreBy(5);
                coins[i].setImage(blankImage)
                coins[i].setKind(1)
                music.powerUp.play()
            }
            ++i;
        }
    }
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
    for (let j = 0; j <= trees.length - 1; j++) {
        trees[j].y -= treeSpeed
if (trees[j].y < -30) {
            trees[j].y = screen.height + 30
            trees[j].x = RandomInt(screen.width)
            trees[j].setImage(list[RandomInt(list.length)])
            info.changeScoreBy(1)
            if (RandomInt(100) > 0) {
                CreateCoin(trees[j])
            }
            if (info.score() % pointsForSpeed == 0) {
                treeSpeed += 1
                pointsForSpeed *= 2
            }
        }
        if (iFrames == 0) {
            if (Collision(player, trees[j], .3)) {
                info.changeLifeBy(-1)
                if (info.life() > 0) {
                    iFrames = 50
                    music.powerDown.play()
                }
            }
        }
    }
}
function CreateCoin (parent: Sprite) {
    newCoin = sprites.create(img`
        . . . . . . 5 5 5 5 . . . . . .
        . . . . 5 5 5 5 5 5 5 . . . . .
        . . . 5 5 5 5 5 5 5 5 . . . . .
        . . 5 5 5 5 5 5 5 5 5 5 . . . .
        . . 5 5 5 5 5 5 5 5 5 5 5 . . .
        . . 5 5 5 5 5 5 5 5 5 5 5 . . .
        . 5 5 5 5 5 5 5 5 5 5 5 5 . . .
        . 5 5 5 5 5 5 5 5 5 5 5 5 . . .
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 . .
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 . .
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 . .
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . .
        . . 5 5 5 5 5 5 5 5 5 5 5 . . .
        . . 5 5 5 5 5 5 5 5 5 5 5 . . .
        . . . 5 5 5 5 5 5 5 5 5 . . . .
        . . . 5 5 5 5 5 . . . . . . . .
    `, 0)
    newCoin.y = screen.height + 30
    if (parent.x > screen.width / 2) {
        newCoin.x = parent.x - 20
    } else {
        newCoin.x = parent.x + 20
    }
    coins.push(newCoin)
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
    scene.setBackgroundColor(12)
    player = sprites.create(playerSprite, 0)
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
    list.push(img`
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . 6 6 . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . 6 6 6 6 . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . 6 6 6 6 6 . . . . . . . . . . . .
        . . . . . . . . . . . . . . 6 6 6 6 6 6 6 . . . . . . . . . . .
        . . . . . . . . . . . . . . 6 6 6 6 6 6 6 . . . . . . . . . . .
        . . . . . . . . . . . . . 6 6 6 6 6 6 6 6 . . . . . . . . . . .
        . . . . . . . . . . . . 6 6 6 6 6 6 6 6 6 6 . . . . . . . . . .
        . . . . . . . . . . . . 6 6 6 6 6 6 6 6 6 6 . . . . . . . . . .
        . . . . . . . . . . . 6 6 6 6 6 6 6 6 6 6 6 6 . . . . . . . . .
        . . . . . . . . . . 6 6 6 6 6 6 6 6 6 6 6 6 6 . . . . . . . . .
        . . . . . . . . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 . . . . . . . . .
        . . . . . . . . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 . . . . . . . .
        . . . . . . . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 . . . . . . . .
        . . . . . . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 . . . . . . .
        . . . . . . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 . . . . . . .
        . . . . . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 . . . . . .
        . . . . . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 . . . . . .
        . . . . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 . . . . .
        . . . . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 . . . . .
        . . . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 . . . .
        . . . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 . . .
        . . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 . . .
        . . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 . . .
        . . 6 6 6 6 6 6 6 6 6 6 6 e 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 . . .
        . 6 6 6 6 6 6 6 6 6 6 6 6 6 e e e e e e 6 6 6 6 6 6 6 6 6 . . .
        . . . . 6 6 6 6 6 6 6 6 6 e e e e e e e 6 6 6 6 6 6 6 6 . . . .
        . . . . . . . . . . . . e e e e e e e e . . . . . . . . . . . .
        . . . . . . . . . . . . e e e e e e e e . . . . . . . . . . . .
        . . . . . . . . . . . . e e e e e e e e . . . . . . . . . . . .
        . . . . . . . . . . . e e e e e e e e e . . . . . . . . . . . .
    `)
    info.setScore(0)
    info.setLife(3)
    speed = 3
    player.y = 20
    treeSpeed = 1
    treesLeft = 5
    treeTimer = 1
    pointsForSpeed = 10
    info.setBackgroundColor(9)
info.setFontColor(0)
info.setBorderColor(10)
}
let playerSprite: Image = null
let newCoin: Sprite = null
let iFrames = 0
let newTree: Sprite = null
let treeTimer = 0
let treesLeft = 0
let player: Sprite = null
let trees: Sprite[] = []
let coins: Sprite[] = []
let list: Image[] = []
let pointsForSpeed = 0
let treeSpeed = 0
let speed = 0
let blankImage: Image = null
SetUp()
game.onUpdate(function () {
    MovePlayer()
    CreateTrees()
    UpdateTrees()
    UpdateCoins()
    FlashEffect()
})
