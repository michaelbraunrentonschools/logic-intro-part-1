enum SpriteKindLegacy {
    Player,
    Projectile,
    Food,
    Enemy
}
sprites.onOverlap(SpriteKindLegacy.Player, SpriteKindLegacy.Enemy, function (sprite, otherSprite) {
    game.over(false)
})
let extra_velocity = 0
let enemy: Sprite = null
let player = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
5 . 7 7 . 7 7 7 7 7 7 . . . . . 
2 5 2 7 7 7 7 7 7 7 7 7 . . . . 
2 5 5 7 7 7 1 7 1 7 1 7 7 . . . 
5 2 2 7 7 7 7 7 7 7 7 7 . . . . 
5 . 7 7 . 7 7 7 7 7 7 . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKindLegacy.Player)
controller.moveSprite(player)
player.x = 8
player.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
game.onUpdateInterval(2000, function () {
    info.changeScoreBy(1)
})
game.onUpdateInterval(500, function () {
    enemy = sprites.create(img`
. . . . . . . . . c c 8 . . . . 
. . . . . . 8 c c c f 8 c c . . 
. . . c c 8 8 f c a f f f c c . 
. . c c c f f f c a a f f c c c 
8 c c c f f f f c c a a c 8 c c 
c c c b f f f 8 a c c a a a c c 
c a a b b 8 a b c c c c c c c c 
a f c a a b b a c c c c c f f c 
a 8 f c a a c c a c a c f f f c 
c a 8 a a c c c c a a f f f 8 a 
. a c a a c f f a a b 8 f f c a 
. . c c b a f f f a b b c c 6 c 
. . . c b b a f f 6 6 a b 6 c . 
. . . c c b b b 6 6 a c c c c . 
. . . . c c a b b c c c . . . . 
. . . . . c c c c c c . . . . . 
`, SpriteKindLegacy.Enemy)
    enemy.setPosition(scene.screenWidth(), Math.randomRange(0, scene.screenHeight()))
    extra_velocity = 0
    if (Math.percentChance(20)) {
        extra_velocity = Math.randomRange(0, 50)
    } else {
        extra_velocity = Math.randomRange(-16, 16)
    }
    enemy.vx = -50 - 5 * info.score() - extra_velocity
    if (info.score() <= 20) {
        controller.moveSprite(player, 100 - 2 * info.score(), 100 - 2 * info.score())
    }
})
