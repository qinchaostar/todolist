window.addEventListener('load', function () {
    let tab = document.querySelectorAll('.tab > li')
    let prev = 0;
    let content = document.querySelector('.content')
    let type = 'all'
    let todolist = [
        {
            id: 1, content: '端午要交作业', ctime: '2019/6/4', status: false
        },
        {
            id: 2, content: '我不想交作业', ctime: '2019/6/4', status: false
        },
        {
            id: 3, content: '企业网站', ctime: '2019/5/31', status: true
        },
        {
            id: 4, content: '需求文档', ctime: '2019/6/10', status: true
        }
    ]

    tab.forEach(function (ele, index) {
        ele.onclick = function () {
            tab[prev].classList.remove('hot');
            this.classList.add('hot')
            prev = index;
            type = this.getAttribute('type')

            render(filterData(type))

        }

    });

    tab[0].onclick();
    // let checkboxs = document.querySelectorAll('input[type=checkbox]');
    // console.log(checkboxs);
    // checkboxs.forEach(ele=>{
    //     ele.onclick=function () {
    //         let id = this.parentNode.id;
    //         let arr=todolist.filter(eles=>eles.id==id);
    //
    //         console.log(arr);
    //     }
    // })
    content.onclick = function (e) {
        let target = e.target;
        let id = target.parentNode.id;
        if (target.nodeName == 'DEL') {
            // todolist.filter(ele=>ele.id!=id)
            let index = todolist.findIndex(ele => ele.id == id);
            todolist.splice(index, 1)

        } else if (target.nodeName == 'INPUT') {
            let ele = todolist.filter(ele => ele.id == id)[0];
            ele.status = target.checked;
        }
        render(filterData(type))
    }

    /////
    ///
    function filterData(type) {
        let arr = []
        switch (type) {
            case "all":
                arr = todolist;
                break;
            case "done":
                arr = todolist.filter(ele => ele.status);
                break;
            case "doing":
                arr = todolist.filter(ele => !ele.status);
                break;
        }
        return arr;
    }


    ///////////////////////////添加/////////////////////////////
    let forms = document.forms[0];
    let texBtn = forms.elements['content'];
    let submitBtn = forms.elements[1];
    console.log(forms);
    console.log(texBtn);
    console.log(submitBtn);

    submitBtn.onclick = function (e) {
        e.preventDefault();
        let obj = creatObj();
        todolist.push(obj);
        forms.reset();
        render(filterData(type))
        console.log(texBtn.value);
    };
    ////////////////////////////creatobj///////////////////////////
    function creatObj() {
        let id = todolist[todolist.length-1].id + 1;
        let content = texBtn.value;
        let  ctime = new Date().toLocaleDateString();
        let  status = false;
        return {id,content,ctime,status}
    }


//    渲染列表
    function render(arr) {
        let html = '';
        arr.forEach(ele => {
            if (ele.status) {
                html += `
           <li id="${ele.id}">
           <input type="checkbox" checked="checked">
           <p>${ele.content}</p>
           <del>X</del>
           <time>${ele.ctime}</time>
           
           </li>
             `;
            } else {
                html += `
           <li id="${ele.id}">
           <input type="checkbox">
           <p>${ele.content}</p>
           <del>X</del>
           <time>${ele.ctime}</time>
           
           </li>
             `;
            }

        })
        content.innerHTML = html;
    }
})