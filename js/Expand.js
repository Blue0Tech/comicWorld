AFRAME.registerComponent('expand',{
    schema: {
        mouseIsInside: {type:'string',default:'none'},
        ids: {type:'array',default:[]}
    },
    init: function() {
        var children = this.el.children;
        for(child of children) {
            this.data.ids.push(child.id);
        addEventListener('mouseenter',e=>{
            if(e.path[1].id!='camera' && e.path[1].id!='places-container') {
                this.data.mouseIsInside = e.path[1].id;
            }
        });
        addEventListener('mouseleave',e=>{
            this.data.mouseIsInside = 'none';
            this.resetAll();
        });
        }
    },
    tick: function() {
        var mouseIsInside = this.data.mouseIsInside;
        if(mouseIsInside!=='none') {
            const entity = document.querySelector(`#${mouseIsInside}`);
            for(var child of entity.children) {
                if(child.className=='border') {
                    child.setAttribute('material',{
                        color: 'red',
                        opacity: 1
                    });
                }
            }
            var pos = entity.getAttribute('position');
            entity.setAttribute('position',{
                x: pos.x,
                y: pos.y,
                z: -35
            });
            var others = entity.parentElement.children;
            for(var other of others) {
                if(other.id!=mouseIsInside) {
                    other.setAttribute('visible',false);
                }
            }
        };
    },
    resetAll: function() {
        for(id of this.data.ids) {
            var entity = document.querySelector(`#${id}`);
            for(var child of entity.children) {
                if(child.className=='border') {
                    child.setAttribute('material',{
                        color: 'orange',
                        opacity: 0.7
                    });
                }
            }
            var pos = entity.getAttribute('position');
            entity.setAttribute('position',{
                x: pos.x,
                y: pos.y,
                z: -40
            });
            entity.setAttribute('visible',true);
        };
    }
});