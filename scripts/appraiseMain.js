import { CreateAppraiseBlock } from "./createAppraiseBlock.js"
import { RequestData } from "./ajax.js";

let formInputCheckedAppraise
let typeBlock = {
    'year': ['mileage'],
    'equipment': ['year', 'mileage'],
    'modification': [ 'equipment', 'year', 'mileage'],
    'generation': [ 'modification', 'equipment', 'year', 'mileage'],
    'model': ['generation', 'modification', 'equipment', 'year', 'mileage'],
    'brand': ['model', 'generation', 'modification', 'equipment', 'year', 'mileage']

}
/* -------------------------------------------------- */


function addEventChangeGeneralFormAppraise(params) {
    let formAppraise = document.querySelector('.appraise-form')
    ajaxRequestAppraise('brand', 'Бренд', '-brands')
    let brand = document.querySelector('.acord [data-name="brand"]')
    formAppraise.addEventListener('change', (event) => {
        removeCallbackFormBlock()


        switch (event.target.name) {
            case 'brand':

                ajaxRequestAppraise('model', 'Модель', '-models?brand_id=' + getTargetInput(event), event)
                addDescriptionToTheRolledUpAccardion(event.target.value, event.target.name, 'Бренд')

                break;
            case 'model':
                ajaxRequestAppraise('generation', 'Поколение', '-generations?model_id=' + getTargetInput(event), event)
                addDescriptionToTheRolledUpAccardion(event.target.value, event.target.name, 'Модель')
                break;
            case 'generation':
                ajaxRequestAppraise('modification', 'Модификация', '-versions?generation_id=' + getTargetInput(event), event)
                addDescriptionToTheRolledUpAccardion(event.target.value, event.target.name, 'Поколение')
                break;
            case 'modification':
                ajaxRequestAppraise('equipment', 'Уровень оснащения', '-equipments?version_id=' + getTargetInput(event), event)
                addDescriptionToTheRolledUpAccardion(event.target.value, event.target.name, 'Модификация')

                break;
            case 'equipment':
                ajaxRequestAppraise('year', 'Год выпуска', '-years?equipment_id=' + getTargetInput(event), event)
                addDescriptionToTheRolledUpAccardion(event.target.value, event.target.name, 'Уровень оснащения')

                break;
            case 'year':
                CreateAppraiseBlock('mileage', 'Пробег')
                addDescriptionToTheRolledUpAccardion(event.target.value, event.target.name, 'Год выпуска')
                
                break;
            case 'mileage':


                break;
            default:
                break;
        }
    })
}

addEventChangeGeneralFormAppraise()


let appraiseCarList = document.querySelector('.appraise-car-body__list');
appraiseCarList.addEventListener('click', function (e) {
    if (e.target.className == 'acord') {
        let target = e.target.attributes['data-name'].value;
        let content = document.querySelector('.app-list-item[data-name="' + target + '"]');
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }
});





function ajaxRequestAppraise(nameBlock, nameAccardeon, url, e) {
    new RequestData().requestRun("http://dev.mitsubishi.by/new-filter/get-with-mileage" + url, "GET").then((data) => {
        setSessionStorage(arrayData, data, nameBlock)
        
        if (e) {
            removeBlockDependsOnEventTarget(e.target.name)
        }
        let blockList = document.querySelector('.appraise-car-body__' + nameBlock)
        if (!blockList) {
            CreateAppraiseBlock(nameBlock, nameAccardeon, data)
            trackingAppraiseComleteLine()
        } if (blockList) {
            CreateAppraiseBlock(nameBlock, nameAccardeon, data)
            trackingAppraiseComleteLine()
        }
        trackingBtnShowMoreAndAddEvent()
        return formInputCheckedAppraise = ''
    })

}

let arrayData = {
    'brand': [],
    'model': []
}
function setSessionStorage(arrayData, data, nameBlock) {

    if (nameBlock == 'brand') {
        arrayData.brand = []
        data.forEach(element => {
            arrayData.brand.push(element)

        });
    } if (nameBlock == 'model') {
        arrayData.model = []
        data.forEach(element => {
            arrayData.model.push(element)

        });
    }
    return sessionStorage.dataCars = JSON.stringify({ arrayData })
}

function getTargetInput(event) {
    formInputCheckedAppraise = event.target.attributes['data-id'].value
    let activAccardeon = document.querySelector('.acord[data-name="' + event.target.attributes['name'].value + '"]').click()

    return formInputCheckedAppraise
}


function removeBlockDependsOnEventTarget(blockTarget) {

    typeBlock[blockTarget].forEach(element => {
        let block = document.querySelector('.appraise-car-body__' + element + '.list-content')
        if (block) {
            block.remove()
        }
    });


}



function trackingBtnShowMoreAndAddEvent(params) {
    let btnShowMore = document.querySelectorAll('.btn-show-more')

    btnShowMore.forEach(element => {

        let btnClassName = element.className.replace('btn-show-more-', '').replace('btn-show-more', '')
        let label = document.querySelectorAll('.' + btnClassName + ' label')

        element.addEventListener('click', (event) => {
            let blockForRadioInput = event.target.parentElement.previousSibling
            let listContent = event.target.parentElement.parentNode

            listContent.style.maxHeight = 'unset'
            if (blockForRadioInput.style.maxHeight < 140 + 'px' || blockForRadioInput.style.maxHeight == 140 + 'px') {
                blockForRadioInput.style.maxHeight = 'unset'
                element.innerHTML = 'свернуть'
            }
            else {
                element.innerHTML = 'Показать все'
                blockForRadioInput.style.maxHeight = 140 + 'px'
            }
        })
        if (label.length <= 16) {
            element.style.opacity = 0
            element.style.pointerEvents = 'none'
        }
        else {
            element.style.opacity = 1
            element.style.pointerEvents = 'unset'
        }
    });
}

function addDescriptionToTheRolledUpAccardion(eventTargetValue, eventTargetName, text) {

    document.querySelector('.acord[data-name="' + eventTargetName + '"]').innerHTML = text + ': ' + eventTargetValue
}

function removeCallbackFormBlock() {
    let callBackForm = document.querySelector('.callback-form')
    if (callBackForm) {
        callBackForm.parentNode.removeChild(callBackForm)
    }
}


function trackingAppraiseComleteLine(params) {
    let appraiseLine = document.querySelector('.appraise-car-header__comlete-line')
    let appraiseListContentCount = document.querySelectorAll('.list-content')
    switch (appraiseListContentCount.length) {
        case 1:
            break;
        case 2:
            appraiseLine.classList.add('one')
            break;
        case 3:
            appraiseLine.classList.add('two')
            break;
        case 4:
            appraiseLine.classList.add('three')
            break;
        case 5:
            appraiseLine.classList.add('four')
            break;
        case 6:
            appraiseLine.classList.add('five')
            break;
        case 7:
            appraiseLine.classList.add('six')

            break;
        default:
            break;
    }

}