class HanoiView{
  constructor(game, $rootEl){
    this.game = game;
    this.$rootEl = $rootEl;
    this.setupTowers();
    this.firstSelectedTower = undefined;
    this.bindEvents()
  }
  
  setupTowers(){
    this._createTowers();
    this.render();
  }
  
  _createTowers(){
    for (let i = 0; i < 3; i++) {
      let $ul = $("<ul class='tower'></ul>");
      $ul.data('towerNum', i);
      for (let j = 0; j < 3; j++) {
        $ul.append('<li></li>');
      }
      this.$rootEl.append($ul);
    }
  }
  
  render(){
    const state = this.game.towers;
    for (var i = 0; i < state.length; i++) {
      const gameTower = state[i];
      for (var j = 0; j < gameTower.length; j++) {
        const stack = gameTower[j];
        const $ulTower = $('ul').eq(i);
        const $liStack = $ulTower.children().eq(j);
        $liStack.addClass(`stack-${stack}`);
      }
    }
  }
  
  bindEvents(){
    $('ul').on('click', (e) => {
      const $tower = $(e.currentTarget);
      this.clickTower($tower);
    });
    
  }
  
  clickTower($tower){
    if (this.firstSelectedTower) {
      if (!this.game.move(this.firstSelectedTower,$tower.data('towerNum'))) {
        alert("Invalid Move! Try again.");
      }
      this.firstSelectedTower = undefined;
      
    } else {
      this.firstSelectedTower = $tower.data('towerNum');
      $tower.addClass('selected');
      
    }
    this.render();
  }
    
}



module.exports = HanoiView;