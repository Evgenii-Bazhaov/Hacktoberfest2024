# Initialize Pygame
pygame.init()

# Set up display
WIDTH, HEIGHT = 800, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Monkey Game")

# Colors
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
BROWN = (139, 69, 19)

# Monkey class
class Monkey:
    def __init__(self):
        self.x = 50
        self.y = HEIGHT - 60
        self.width = 50
        self.height = 50
        self.jump = False
        self.jump_count = 10

    def draw(self):
        pygame.draw.rect(screen, BROWN, (self.x, self.y, self.width, self.height))

    def update(self):
        if self.jump:
            if self.jump_count >= -10:
                neg = 1
                if self.jump_count < 0:
                    neg = -1
                self.y -= (self.jump_count ** 2) * 0.5 * neg
                self.jump_count -= 1
            else:
                self.jump = False
                self.jump_count = 10

# Obstacle class
class Obstacle:
    def __init__(self):
        self.x = WIDTH
        self.y = HEIGHT - 60
        self.width = 20
        self.height = 40
        self.speed = 7

    def draw(self):
        pygame.draw.rect(screen, GREEN, (self.x, self.y, self.width, self.height))

    def update(self):
        self.x -= self.speed

# Main game function
def game():
    clock = pygame.time.Clock()
    monkey = Monkey()
    obstacles = []
    score = 0

    run = True
    while run:
        clock.tick(30)
        screen.fill(WHITE)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE and not monkey.jump:
                    monkey.jump = True

        # Update monkey and obstacles
        monkey.update()
        if random.randint(0, 30) == 0:
            obstacles.append(Obstacle())

        for obstacle in obstacles:
            obstacle.update()
            if obstacle.x < 0:
                obstacles.remove(obstacle)
                score += 1
            if (monkey.x + monkey.width > obstacle.x and monkey.x < obstacle.x + obstacle.width and
                    monkey.y + monkey.height > obstacle.y):
                run = False  # Collision detected

        # Draw everything
        monkey.draw()
        for obstacle in obstacles:
            obstacle.draw()

        # Display score
        font = pygame.font.Font(None, 36)
        score_text = font.render(f"Score: {score}", True, (0, 0, 0))
        screen.blit(score_text, (10, 10))

        pygame.display.flip()

    pygame.quit()

if __name__ == "__main__":
    game()
