# Importing all required modules
import os
import random
import pygame
from pygame import mixer

# Initialising pygame objects
pygame.init()
pygame.font.init()

# Setting up the dimensions of the screen
WIDTH, HEIGHT = 750, 750
WIN = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Space Shooter")

# Load enemy objects
RED_SPACE_SHIP = pygame.image.load(os.path.join("assets", "ufo.png"))
GREEN_SPACE_SHIP = pygame.image.load(os.path.join("assets", "enemy.png"))

# Load the health booster image
HEALTH_BOOSTER = pygame.image.load(os.path.join("assets", "health.png"))

# Load the coin image
COIN = pygame.image.load(os.path.join("assets", "coin.png"))

# Load the power booster image
POWERUP = pygame.image.load(os.path.join("assets", "power.png"))

# Player player
YELLOW_SPACE_SHIP = pygame.image.load(os.path.join("assets", "player.png"))

# Lasers
RED_LASER = pygame.image.load(os.path.join("assets", "pixel_laser_red.png"))
GREEN_LASER = pygame.image.load(os.path.join("assets", "pixel_laser_green.png"))
BLUE_LASER = pygame.image.load(os.path.join("assets", "pixel_laser_blue.png"))
YELLOW_LASER = pygame.image.load(os.path.join("assets", "pixel_laser_yellow.png"))

# Background
BG = pygame.transform.scale(
    pygame.image.load(os.path.join("assets", "background-black.png")), (WIDTH, HEIGHT)
)

# Background music
mixer.music.load("background.wav")
mixer.music.play(-1)


class Laser:
    def __init__(self, x, y, img):
        """
        Initialize a Laser object.

        Args:
            x (int): The x-coordinate of the laser's starting position.
            y (int): The y-coordinate of the laser's starting position.
            img (Surface): The image representing the laser.

        Attributes:
            x (int): The x-coordinate of the laser's current position.
            y (int): The y-coordinate of the laser's current position.
            img (Surface): The image representing the laser.
            mask (Mask): The mask representing the laser's image for collision detection.
        """
        self.x = x
        self.y = y
        self.img = img
        self.mask = pygame.mask.from_surface(self.img)

    def draw(self, window):
        """
        Draw the laser on the game window.

        Args:
            window (Surface): The game window surface to draw on.
        """
        window.blit(self.img, (self.x, self.y))

    def move(self, vel):
        """
        Move the laser vertically based on the given velocity.

        Args:
            vel (int): The velocity of the laser's movement.
        """
        self.y += vel

    def off_screen(self, height):
        """
        Check if the laser is off the screen.

        Args:
            height (int): The height of the game window.

        Returns:
            bool: True if the laser is off the screen, False otherwise.
        """
        return not (self.y <= height and self.y >= 0)

    def collision(self, obj):
        """
        Check if the laser collides with another object.

        Args:
            obj (object): The object to check collision with.

        Returns:
            bool: True if a collision occurs, False otherwise.
        """
        return collide(self, obj)


class HealthBooster:
    def __init__(self, x, y):
        """
        Initialize a HealthBooster object.

        Args:
            x (int): The x-coordinate of the booster's position.
            y (int): The y-coordinate of the booster's position.

        Attributes:
            x (int): The x-coordinate of the booster's current position.
            y (int): The y-coordinate of the booster's current position.
            img (Surface): The image representing the health booster.
            mask (Mask): The mask representing the booster's image for collision detection.
        """
        self.x = x
        self.y = y
        self.img = HEALTH_BOOSTER
        self.mask = pygame.mask.from_surface(self.img)

    def draw(self, window):
        """
        Draw the health booster on the game window.

        Args:
            window (Surface): The game window surface to draw on.
        """
        window.blit(self.img, (self.x, self.y))

    def move(self, vel):
        """
        Move the health booster vertically based on the given velocity.

        Args:
            vel (int): The velocity of the booster's movement.
        """
        self.y += vel


class Coin:
    def __init__(self, x, y):
        """
        Initialize a Coin object.

        Args:
            x (int): The x-coordinate of the coin's position.
            y (int): The y-coordinate of the coin's position.

        Attributes:
            x (int): The x-coordinate of the coin's current position.
            y (int): The y-coordinate of the coin's current position.
            img (Surface): The image representing the coin.
            mask (Mask): The mask representing the coin's image for collision detection.
        """
        self.x = x
        self.y = y
        self.img = COIN
        self.mask = pygame.mask.from_surface(self.img)

    def draw(self, window):
        """
        Draw the coin on the game window.

        Args:
            window (Surface): The game window surface to draw on.
        """
        window.blit(self.img, (self.x, self.y))

    def move(self, vel):
        """
        Move the coin vertically based on the given velocity.

        Args:
            vel (int): The velocity of the coin's movement.
        """
        self.y += vel


class PowerUp:
    def __init__(self, x, y):
        """
        Initialize a Power-Up object.

        Args:
            x (int): The x-coordinate of the power-up's position.
            y (int): The y-coordinate of the power-up's position.

        Attributes:
            x (int): The x-coordinate of the power-up's current position.
            y (int): The y-coordinate of the power-up's current position.
            img (Surface): The image representing the power-up.
            mask (Mask): The mask representing the power-up's image for collision detection.
        """
        self.x = x
        self.y = y
        self.img = POWERUP
        self.mask = pygame.mask.from_surface(self.img)

    def draw(self, window):
        """
        Draw the power-up on the game window.

        Args:
            window (Surface): The game window surface to draw on.
        """
        window.blit(self.img, (self.x, self.y))

    def move(self, vel):
        """
        Move the power-up vertically based on the given velocity.

        Args:
            vel (int): The velocity of the power-up's movement.
        """
        self.y += vel


class Ship:
    COOLDOWN = 30

    def __init__(self, x, y, health=100):
        """
        Initialize a Ship object.

        Args:
            x (int): The x-coordinate of the ship's position.
            y (int): The y-coordinate of the ship's position.
            health (int, optional): The initial health of the ship. Defaults to 100.

        Attributes:
            x (int): The x-coordinate of the ship's current position.
            y (int): The y-coordinate of the ship's current position.
            health (int): The current health of the ship.
            ship_img (Surface): The image representing the ship.
            laser_img (Surface): The image representing the ship's lasers.
            lasers (list): A list of Laser objects fired by the ship.
            cool_down_counter (int): The cooldown counter for shooting lasers.
        """
        self.x = x
        self.y = y
        self.health = health
        self.ship_img = None
        self.laser_img = None
        self.lasers = []
        self.cool_down_counter = 0

    def draw(self, window):
        """
        Draw the ship and its lasers on the game window.

        Args:
            window (Surface): The game window surface to draw on.
        """
        window.blit(self.ship_img, (self.x, self.y))
        for laser in self.lasers:
            laser.draw(window)

    def move_lasers(self, vel, obj):
        """
        Move the ship's lasers and handle collisions with objects.

        Args:
            vel (int): The velocity of the lasers' movement.
            obj (object): The object to check for collisions with the lasers.
        """
        self.cooldown()
        for laser in self.lasers:
            laser.move(vel)
            if laser.off_screen(HEIGHT):
                self.lasers.remove(laser)
            elif laser.collision(obj):
                obj.health -= 10
                self.lasers.remove(laser)

    def cooldown(self):
        """
        Manage the cooldown counter for shooting lasers.
        """
        if self.cool_down_counter >= self.COOLDOWN:
            self.cool_down_counter = 0
        elif self.cool_down_counter > 0:
            self.cool_down_counter += 1

    def shoot(self):
        """
        Shoot a laser from the ship, if the cooldown allows.
        """
        if self.cool_down_counter == 0:
            bulletSound = mixer.Sound("laser.wav")
            bulletSound.play()
            laser = Laser(self.x, self.y, self.laser_img)
            self.lasers.append(laser)
            self.cool_down_counter = 1

    def get_width(self):
        """
        Get the width of the ship's image.

        Returns:
            int: The width of the ship's image.
        """
        return self.ship_img.get_width()

    def get_height(self):
        """
        Get the height of the ship's image.

        Returns:
            int: The height of the ship's image.
        """
        return self.ship_img.get_height()


class Player(Ship):
    def __init__(self, x, y, health=100):
        """
        Initialize a Player object, inheriting from the Ship class.

        Args:
            x (int): The x-coordinate of the player's position.
            y (int): The y-coordinate of the player's position.
            health (int, optional): The initial health of the player. Defaults to 100.

        Attributes:
            score (int): The current score of the player.
            ship_img (Surface): The image representing the player's ship.
            laser_img (Surface): The image representing the player's lasers.
            mask (Mask): The mask for collision detection with the player's ship.
            max_health (int): The maximum health of the player's ship.
        """
        super().__init__(x, y, health)
        self.score = 0
        self.ship_img = YELLOW_SPACE_SHIP
        self.laser_img = YELLOW_LASER
        self.mask = pygame.mask.from_surface(self.ship_img)
        self.max_health = health

    def move_lasers(self, vel, objs):
        """
        Move the player's lasers and handle collisions with objects.

        Args:
            vel (int): The velocity of the lasers' movement.
            objs (list): A list of objects to check for collisions with the lasers.

        Returns:
            int: The updated score of the player.
        """
        self.cooldown()
        for laser in self.lasers:
            laser.move(vel)
            if laser.off_screen(HEIGHT):
                self.lasers.remove(laser)
            else:
                for obj in objs:
                    if laser.collision(obj):
                        objs.remove(obj)
                        self.score += 1
                        explosionSound = mixer.Sound("explosion.wav")
                        explosionSound.play()
                        if laser in self.lasers:
                            self.lasers.remove(laser)
        return self.score

    def draw(self, window):
        """
        Draw the player's ship, lasers, and health bar on the game window.

        Args:
            window (Surface): The game window surface to draw on.
        """
        super().draw(window)
        self.healthbar(window)

    def healthbar(self, window):
        """
        Draw the health bar for the player's ship on the game window.

        Args:
            window (Surface): The game window surface to draw on.
        """
        pygame.draw.rect(
            window,
            (255, 0, 0),
            (
                self.x,
                self.y + self.ship_img.get_height() + 10,
                self.ship_img.get_width(),
                10,
            ),
        )
        pygame.draw.rect(
            window,
            (0, 255, 0),
            (
                self.x,
                self.y + self.ship_img.get_height() + 10,
                self.ship_img.get_width() * (self.health / self.max_health),
                10,
            ),
        )


class Enemy(Ship):
    COLOR_MAP = {
        "red": (RED_SPACE_SHIP, RED_LASER),
        "green": (GREEN_SPACE_SHIP, GREEN_LASER),
    }

    def __init__(self, x, y, color, health=100):
        """
        Initialize an Enemy object, inheriting from the Ship class.

        Args:
            x (int): The x-coordinate of the enemy's position.
            y (int): The y-coordinate of the enemy's position.
            color (str): The color of the enemy ship ("red" or "green").
            health (int, optional): The initial health of the enemy. Defaults to 100.

        Attributes:
            ship_img (Surface): The image representing the enemy's ship.
            laser_img (Surface): The image representing the enemy's lasers.
            mask (Mask): The mask for collision detection with the enemy's ship.
        """
        super().__init__(x, y, health)
        self.ship_img, self.laser_img = self.COLOR_MAP[color]
        self.mask = pygame.mask.from_surface(self.ship_img)

    def move(self, vel):
        """
        Move the enemy vertically by a given velocity.

        Args:
            vel (int): The velocity of the enemy's movement.
        """
        self.y += vel

    def shoot(self):
        """
        Create a laser object and add it to the enemy's lasers list.

        This method is called when the enemy is ready to shoot.

        Note:
            The laser is positioned to the left of the enemy ship.

        Side Effects:
            - Adds a Laser object to the enemy's lasers list.
            - Updates the enemy's cooldown counter.
        """
        if self.cool_down_counter == 0:
            laser = Laser(self.x - 20, self.y, self.laser_img)
            self.lasers.append(laser)
            self.cool_down_counter = 1


def collide(obj1, obj2):
    """
    Check if two objects collide with each other.

    Args:
        obj1: The first object.
        obj2: The second object.

    Returns:
        bool: True if the objects collide, False otherwise.
    """
    offset_x = obj2.x - obj1.x
    offset_y = obj2.y - obj1.y
    return obj1.mask.overlap(obj2.mask, (offset_x, offset_y)) != None


def main():
    run = True
    FPS = 60
    level = 0
    score = 0
    lives = 5
    main_font = pygame.font.SysFont("comicsans", 20)
    lost_font = pygame.font.SysFont("comicsans", 60)

    enemies = []
    wave_length = 5
    enemy_vel = 1

    player_vel = 5
    laser_vel = 5

    player = Player(300, 630)

    clock = pygame.time.Clock()

    lost = False
    lost_count = 0

    boosters = []
    booster_vel = 1

    coins = []
    coins_vel = 1
    coin_score = 0

    powers = []
    power_vel = 1

    enemy_laser_vel = 5

    def redraw_window():
        """
        Redraws the game window with updated game elements, scores, and messages.

        This function updates the game window with the current state of the game. It draws the background,
        player, enemies, boosters, coins, power-ups, and text elements such as lives, score, high score, and level.
        If the player has lost the game, it displays a "You Lost!" message. It also checks if the current score
        is higher than the previous high score and updates it accordingly.

        Parameters:
            None

        Returns:
            None
        """
        file_path = "high_score.txt"
        with open(file_path, "r") as file:
            highScore = file.read()
        WIN.blit(BG, (0, 0))
        # draw text
        lives_label = main_font.render(f"Lives: {lives}", 1, (255, 255, 255))
        scores = main_font.render(f"Score: {score}", 1, (255, 255, 255))
        high_score = main_font.render(f"High Score: {highScore}", 1, (255, 255, 255))
        level_label = main_font.render(f"Level: {level}", 1, (255, 255, 255))

        WIN.blit(lives_label, (10, 10))
        WIN.blit(level_label, (WIDTH - level_label.get_width() - 10, 10))

        WIN.blit(
            scores,
            (WIDTH / 2 - scores.get_width() / 2 - high_score.get_width() / 2, 10),
        )
        WIN.blit(high_score, (WIDTH / 2 + high_score.get_width() / 2, 10))

        for enemy in enemies:
            enemy.draw(WIN)

        for booster in boosters:
            booster.draw(WIN)

        for coin in coins:
            coin.draw(WIN)

        for power in powers:
            power.draw(WIN)

        player.draw(WIN)

        if lost:
            lost_label = lost_font.render("You Lost!!", 1, (255, 255, 255))
            WIN.blit(lost_label, (WIDTH / 2 - lost_label.get_width() / 2, 350))

            if int(highScore) < score:
                highScore = str(score)
                with open(file_path, "w") as file:
                    file.write(highScore)

        pygame.display.update()

    while run:
        clock.tick(FPS)
        redraw_window()

        if lives <= 0 or player.health <= 0:
            lost = True
            lost_count += 1

        if lost:
            if lost_count > FPS * 3:
                run = False
            else:
                continue

        if len(enemies) == 0:
            level += 1
            wave_length += 5
            for i in range(wave_length):
                enemy = Enemy(
                    random.randrange(50, WIDTH - 100),
                    random.randrange(-1500, -100),
                    random.choice(["red", "green"]),
                )
                enemies.append(enemy)

        if len(boosters) == 0:
            # Generate a new health booster
            booster = HealthBooster(
                random.randrange(50, WIDTH - 100), random.randrange(-1500, -100)
            )
            boosters.append(booster)

        if len(coins) == 0:
            # Generate a new coin
            coin = Coin(
                random.randrange(50, WIDTH - 100), random.randrange(-1500, -100)
            )
            coins.append(coin)

        if len(powers) == 0:
            # Generate a new coin
            power = PowerUp(
                random.randrange(50, WIDTH - 100), random.randrange(-1500, -100)
            )
            powers.append(power)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                quit()

        keys = pygame.key.get_pressed()
        if keys[pygame.K_a] and player.x - player_vel > 0:  # left
            player.x -= player_vel
        if (
            keys[pygame.K_d] and player.x + player_vel + player.get_width() < WIDTH
        ):  # right
            player.x += player_vel
        if keys[pygame.K_w] and player.y - player_vel > 0:  # up
            player.y -= player_vel
        if (
            keys[pygame.K_s]
            and player.y + player_vel + player.get_height() + 15 < HEIGHT
        ):  # down
            player.y += player_vel
        if keys[pygame.K_SPACE]:
            player.shoot()

        # Check for collision between player and health boosters
        for booster in boosters[:]:
            booster.move(booster_vel)
            if collide(player, booster):
                if player.health > 90:
                    player.health += 0
                else:
                    player.health += 10
                boosters.remove(booster)

            if booster.y >= HEIGHT:
                boosters.remove(booster)

        for coin in coins[:]:
            coin.move(coins_vel)
            if collide(player, coin):
                coin_score += 10
                coins.remove(coin)

            if coin.y >= HEIGHT:
                coins.remove(coin)

        for power in powers[:]:
            power.move(power_vel)
            if collide(player, power):
                laser_vel += 3
                enemy_laser_vel += 0
                powers.remove(power)

            if power.y >= HEIGHT:
                powers.remove(power)

        for enemy in enemies[:]:
            enemy.move(enemy_vel)
            enemy.move_lasers(enemy_laser_vel, player)

            if random.randrange(0, 2 * 60) == 1:
                enemy.shoot()

            if collide(enemy, player):
                player.health -= 10
                enemies.remove(enemy)
            elif enemy.y + enemy.get_height() > HEIGHT:
                lives -= 1
                enemies.remove(enemy)

        score = player.move_lasers(-laser_vel, enemies)
        score += coin_score


def main_menu():
    """
    Displays the main menu of the game and handles the user input to start the game.

    This function displays the game's main menu on the game window. It shows a title label prompting the player
    to press the mouse button to begin the game. It continuously checks for user input events, such as mouse clicks,
    and when the mouse button is pressed, it starts the game by calling the `main` function.

    Parameters:
        None

    Returns:
        None
    """

    title_font = pygame.font.SysFont("comicsans", 55)
    run = True
    while run:
        WIN.blit(BG, (0, 0))
        title_label = title_font.render(
            "Press the mouse to begin...", 1, (255, 255, 255)
        )
        WIN.blit(title_label, (WIDTH / 2 - title_label.get_width() / 2, 350))
        pygame.display.update()
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
            if event.type == pygame.MOUSEBUTTONDOWN:
                main()
    pygame.quit()


if __name__ == "__main__":
    main_menu()
