function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        };
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return { width: '0%'};
            }
            return {width: this.monsterHealth + '%'};
        },
        playerBarStyles() {
            if (this.playerHealth < 0) {
                return { width: '0%'};
            }
            return {width: this.playerHealth + '%'};
        },
        permitSpecialAttack() {
            return this.currentRound % 3 !==0;
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <=0) {
                // Draw
                this.winner = 'draw'
            } else if (value <= 0) {
                // player lost
                this.winner = 'Monster'
            } 
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <=0) {
                // draw
                this.winner = 'draw'
            } else if (value <= 0) {
                //player won
                this.winner = 'Player'
            } 
        }
    },
    methods: {
        attackMonster() {
           this.currentRound++;
           const attackValue = getRandomValue(5, 12);
           this.monsterHealth -= attackValue;
           this.logMessage('Player', 'attack', attackValue);
           this.attackPlayer();
        },
        attackPlayer() {
           const attackValue = getRandomValue(8, 15);
           this.playerHealth -= attackValue
           this.logMessage('Monster', 'attack', attackValue);
        },
        specialAttackMonster() {
           this.currentRound++;
           const attackValue = getRandomValue(10, 25);
           this.monsterHealth -= attackValue;
           this.logMessage('Player', 'special-attack', attackValue);
           this.attackPlayer();
        },
        healPlayer() {
           this.currentRound++;
           const healValue = getRandomValue(8, 20);
           if (this.playerHealth + healValue > 100) {
               this.playerHealth = 100;
           } else {
               this.playerHealth += healValue           
           }
           this.logMessage('Player', 'heal', healValue);
           this.attackPlayer();
        },
        resetGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null,
            this.currentRound = 0;
            this.logMessages = [];
        },
        surrender() {
            this.winner = 'Monster';
        },
        logMessage(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    },
});

app.mount('#game');