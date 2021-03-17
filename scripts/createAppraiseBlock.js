export function CreateAppraiseBlock(blockName, AccardeonName, data) {
    let block
    let form
    let blockFromInputs
    let appraiselist = document.querySelector('.appraise-car-body__list')


    if (data) {
        if (data.status || data.status == false) {
            appraiselist.appendChild(createCallBackForm())
            return
        }
    }


    switch (blockName) {
        case 'brand':
            createFinalBlock(blockName, AccardeonName, data)

            break;
        case 'model':
            createFinalBlock(blockName, AccardeonName, data)

            break;
        case 'generation':
            createFinalBlock(blockName, AccardeonName, data)
            break;
        case 'modification':

            createFinalBlock(blockName, AccardeonName, data)
            break;
        case 'equipment':
            createFinalBlock(blockName, AccardeonName, data)
            break;
        case 'year':
            createFinalBlock(blockName, AccardeonName, data)
            break;
        case 'mileage':
            createFinalBlock(blockName, AccardeonName, data)
            break;
        default:
            break;
    }

    function clickAccordAppraise(blockName) {
        document.querySelector('.acord[data-name="' + blockName + '"]').click()
    }

    function createFinalBlock(blockName, AccardeonName, data) {
        createFormBlockAppraise(blockName)
        createAppraiseAccardeon(AccardeonName, blockName)
        createAppriseListContent(blockName, data)
        createAppraiseBlockForInputRadio(blockName)
        createGeneralBlockAppraise(blockName)
        appraiselist.appendChild(block)
        clickAccordAppraise(blockName)
    }


    function createGeneralBlockAppraise(params) {
        block = createElement('div', { 'class': ['appraise-car-body__' + params, 'list-content'] })
        return block.append(form)
    }


    function createFormBlockAppraise(params) {
        return form = createElement('div', { 'class': 'from-' + params })
    }


    function createAppraiseAccardeon(params, blockName) {
        return form.append(createElement('div', { 'class': 'acord', 'data-name': blockName }, params))
    }


    function createAppriseListContent(name, data) {

        switch (true) {
            case name == 'brand' || name == 'model':
                form.append(createElement('div', {
                    'class': ['appraise-car-body__list-content', 'app-list-item', name,],
                    'data-name': name
                },
                    [createAppraiseInputTex1t(name, data), createAppraiseBlockForInputRadio(name, data), createAppraiseBtnShowMore(name)]
                ))
                
                break;
            case name == 'generation' || name == 'equipment':
                form.append(createElement('div', { 'class': ['appraise-car-body__list-content', 'app-list-item'], 'data-name': name },
                    [createAppraiseBlockForInputRadio(name, data), createAppraiseBtnShowMore(name)]
                ))
                break
            case name == 'mileage':
                form.append(createElement('div', {
                    'class': ['appraise-car-body__list-content', 'app-list-item'],
                    'data-name': name
                },
                    [createAppraiseInputText(name), createApparaiseBtnRate(name)]))
                break
            case name == 'modification':
                form.append(createElement('div', { 'class': ['appraise-car-body__list-content', 'app-list-item'], 'data-name': name },
                    [createAppraiseBlockForInputRadioForModif(name, data), createAppraiseBtnShowMore(name)]))
                break
            case name == 'year':
                form.append(createElement('div', { 'class': ['appraise-car-body__list-content', 'app-list-item'], 'data-name': name },
                    [createAppraiseBlockForInputRadio(name, data), createAppraiseBtnShowMore(name)]))
                break
            default:
                break;
        }

        return form
    }

    function createAppraiseInputTex1t(nameBlock, data) {
        let inp = createElement('div', { 'class': 'appraise-car-body__' + nameBlock + '-input-text' },
            [createElement('input', { 'type': 'text', 'placeholder': 'Начните ввод', 'list': nameBlock,},
            )])
        let datalist = createElement('datalist', { 'id': nameBlock },)
        
        for (const key in data) {
            datalist.appendChild(createElement('option', { 'value': data[key].name },))
        }
        inp.appendChild(datalist)
        return inp
    }

    function createAppraiseInputText(nameBlock) {
        return createElement('div', { 'class': 'appraise-car-body__' + nameBlock + '-input-text' },
            [createElement('input', { 'type': 'text', 'placeholder': 'Начните ввод', 'list': nameBlock },
            )])
    }


    function createAppraiseBlockForInputRadio(nameBlock, data) {
        blockFromInputs = createElement('div', { 'class': 'appraise-car-body__' + nameBlock + '-input-radio' })
        for (const key in data) {
            blockFromInputs.appendChild(createAppraiseInputRadio(nameBlock, data[key].id, data[key].name))
        }
        return blockFromInputs

    }

    function createAppraiseBlockForInputRadioForModif(nameBlock, data) {
        blockFromInputs = createElement('div', { 'class': 'appraise-car-body__' + nameBlock + '-input-radio' })
        data.versions.forEach(element => {

            blockFromInputs.appendChild(createAppraiseInputRadio(nameBlock, element.id, element.name))
        });
        return blockFromInputs
    }


    function createAppraiseInputRadio(params, dataId, dataName) {
        return createElement('label', { 'name': dataName, 'value': params }, [createElement('input', {
            'type': 'radio', 'name': params, 'value': dataName, 'data-id': dataId
        }), createElement('span', {}, '' + dataName)]
        )
    }



    function createAppraiseBtnShowMore(params) {
        return createElement('div', { 'class': 'appraise-car-body__' + params + '-btn-more' }, [createElement('span', { 'class': ['btn-show-more-' + params, 'btn-show-more'] }, 'Показать все')])
    }


    function createApparaiseBtnRate(params) {
        return createElement('div', { 'class': ['appraise-car-body__' + params + '-btn',], 'type': 'submit' },
            [createElement('button', {}, 'Оценить')])
    }


    function createCallBackForm() {
        return createElement('div', { 'class': 'callback-form' }, [
            createElement('p', {}, 'К сожалению у нас нет информации по марке вашего автомобиля, свяжтесь с нами для получения более точной информации'),
            createElement('div', { 'class': 'callback-form__body' }, [createElement('form', {}, [
                createElement('h4', {}, 'Закажите обратный звонок'),
                createElement('input', { 'type': 'text', 'placeholder': 'Введите номер телефона' },),
                createElement('button', { 'type': 'submit' }, 'ОТПРАВИТЬ'),
            ])]),
            createElement('p', {}, [createElement('span', {}, '687-90-90'), 'Единая линия Mitsubishi'])

        ])

    }

    function createElement(typeElem, divAttributs, divInnerText) {

        let div = document.createElement(typeElem)

        if (divAttributs) {
            for (const key in divAttributs) {
                if (key == 'class' && typeof divAttributs[key] == "string") {
                    div.classList.add(divAttributs[key])
                }
                if (key == 'class' && typeof divAttributs[key] == "object") {
                    divAttributs[key].forEach(element => {
                        div.classList.add(element)
                    });
                }
                if (key != 'class') {
                    div.setAttribute(key, divAttributs[key])
                }
            }
        }
        if (divInnerText && typeof divInnerText == 'string') {
            div.innerHTML = divInnerText
        }
        if (typeof divInnerText == 'object' && divInnerText) {
            divInnerText.forEach(element => {
                div.append(element)
            });
        }

        return div
    }


    return block
}


