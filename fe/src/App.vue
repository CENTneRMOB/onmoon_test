<template>
  <div id="app">
    <h1>Diamonds Hunt Game</h1>
    <input
      type="text"
      v-model="player1Name"
      placeholder="Enter Player 1 name"
    />
    <input
      type="text"
      v-model="player2Name"
      placeholder="Enter Player 2 name"
    />
    <input
      type="number"
      v-model.number="fieldSize"
      min="1"
      max="6"
      placeholder="Enter field size"
    />
    <input
      type="number"
      v-model.number="diamondsCount"
      min="1"
      max="35"
      placeholder="Enter the number of diamonds"
    />
    <button @click="startGame">Start Game</button>
    <div v-if="gameId">
      <h2>Game ID: {{ gameId }}</h2>
      <div class="board">
        <div v-for="(row, y) in board" :key="y" class="row">
          <div
            v-for="(cell, x) in row"
            :key="x"
            class="cell"
            @click="makeMove(x, y)"
          >
            {{ cell === '?' ? '?' : cell }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { startGameRequest } from './services/api';
  import socket from './services/socket';

  type GameBoard = (number | '*')[][];

  const gameId = ref<string | null>(null);
  const board = ref<GameBoard>([]);
  const fieldSize = ref<number>(6);
  const diamondsCount = ref<number>(3);
  const player1Name = ref('');
  const player2Name = ref('');

  const startGame = async () => {
    try {
      const data = await startGameRequest({
        fieldSize: fieldSize.value,
        diamondsCount: diamondsCount.value,
        player1Name: player1Name.value,
        player2Name: player2Name.value,
      });

      gameId.value = '25';
      board.value = data;
    } catch (error) {
      console.error('Failed to start game:', error);
    }
  };

  const makeMove = (x: number, y: number) => {
    if (!gameId.value) return;
    const message = JSON.stringify({
      event: 'make_move',
      data: { gameId: gameId.value, x, y },
    });
    socket.send(message);
  };

  socket.onmessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    if (data.board) {
      board.value = data.board;
    }
  };
</script>

<style>
  /* Same as your current styles */
</style>
