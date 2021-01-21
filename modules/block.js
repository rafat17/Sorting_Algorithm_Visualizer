class Block{
    constructor(){
      this.pos_no = Math.floor(Math.random() * 100)
      this.num_disp = true
      this.selected = false
      this.pivoted = false
      this.sorted = false   
    }
}

export default Block