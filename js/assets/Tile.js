(function (window) {
    function Tile(texture, collision, x, y, invisible, universe) {
        this.initialize(texture, collision,x,y, invisible, universe);
    }
    
    Tile.prototype = new _.Bitmap();
    
    // public properties:
    Tile.prototype.Collision = 0 ;


      // constructor:
    Tile.prototype.Bitmap_initialize = Tile.prototype.initialize; //unique to avoid overiding base class

    Tile.prototype.initialize = function(texture, collision, x, y, invisible, universe) {
        if (texture != null) {
            this.Collision = collision ; 
            this.empty = false;
            this.image = tileWall ; 
            this.x = x * this.Width;
            this.y = y * this.Height;
            console.log(invisible); 
            if (invisible)
                this.visible = false ; 

            universeContainer[universe].addChild(this);
        }
        else {
            if (collision == 1) {
                this.empty = true;
                this.Collision = collision ; 
                this.x = x * this.Width;
            }
            else if (collision == 2) {
                this.empty = true;
                this.Collision = collision ; 
                this.x = x * this.Width;

            }
        }
    };

    Tile.prototype.image

    Tile.prototype.Width = TILE_WIDTH;
    Tile.prototype.Height = TILE_HEIGHT;

    window.Tile = Tile;
} (window));