//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.querySelector(".add__new-task");//Add a new task.
var addButton=document.getElementsByClassName("button")[0];//first button
var incompleteTaskHolder=document.querySelector(".incomplete-tasks");//ul of .incomplete-tasks
var completedTasksHolder=document.querySelector(".completed-tasks");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.tasks__edit-btn
    var editButton=document.createElement("button");//edit button

    //button.tasks__delete-btn
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image

    label.innerText=taskString;
    label.className='tasks__label task';

    //Each elements, needs appending
    listItem.className="tasks__item";

    checkBox.className="tasks__checkbox";
    checkBox.type="checkbox";
    editInput.type="text";
    editInput.className="text-input tasks__text-input task";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="button tasks__edit-btn";

    deleteButton.className="button tasks__delete-btn";
    deleteButtonImg.className="delete-img";
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.alt='Remove';
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the .add__new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('.text-input');
    var label=listItem.querySelector(".tasks__label");
    var editBtn=listItem.querySelector(".tasks__edit-btn");
    var containsClass=listItem.classList.contains("tasks__edit-mode");
    //If class of the parent is .tasks__edit-mode
    if(containsClass){

        //switch to .tasks__edit-mode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .tasks__edit-mode on the parent.
    listItem.classList.toggle("tasks__edit-mode");
    editInput.classList.toggle("tasks__text-input_edit");
    label.classList.toggle("tasks__label_edit");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the .completed-tasks
    var listItem=this.parentNode;
    var label=listItem.querySelector(".tasks__label");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
    label.classList.toggle("tasks__label_completed");

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the .incomplete-tasks.
    var listItem=this.parentNode;
    var label=listItem.querySelector(".tasks__label");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
    label.classList.toggle("tasks__label_completed");
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector(".tasks__checkbox");
    var editButton=taskListItem.querySelector(".tasks__edit-btn");
    var deleteButton=taskListItem.querySelector(".tasks__delete-btn");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.