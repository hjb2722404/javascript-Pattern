/**
 * Created by hjb2722404 on 2016/3/1.
 */
var Book = function(title,time,type){
    if(this instanceof Book){
        this.title= title;
        this.time = time;
        this.type = type;
    }else{
        return new Book(title,time,type);
    }

};

var book = Book('js','2012','haha');

console.log(book);
