import * as Fp from '../Fp/index'

export function documentMouseMoveTouchMoveCallback(e) {
    e.preventDefault()

    if (this.isPressed) {
        const eventX = e.x !== undefined ? e.x : e.touches[0].clientX
        const eventY = e.y !== undefined ? e.y : e.touches[0].clientY

        this.updateProp('clientX', eventX)
        this.updateProp('clientY', eventY)

        const possibleClientX = eventX
        const possibleClientY = eventY

        const {
            prevMouseMoveClientX,
            prevMouseMoveClientY,
            isPressed,
            element,
            offsetX,
            clientX,
            offsetY,
            clientY,
            getParentElement,
            shouldRestrictParentElement,
        } = this

        const elementParentElement = getParentElement()
        const isMoved = possibleClientX !== prevMouseMoveClientX || possibleClientY !== prevMouseMoveClientY
        const isDragging = isMoved

        if (isDragging) {
            let x
            let y
            const {
                shouldRestrictParentElement,
                thisGetRestrictElement,
            } = this

            x = clientX - this.getParentElementLeft() - offsetX
            y = clientY - this.getParentElementTop() - offsetY

            const width = this.getElementWidth()
            const height = this.getElementHeight()

            const shouldRestrict = shouldRestrictParentElement || thisGetRestrictElement

            if (shouldRestrict) {
                const getParentRestrictElement = () => this.$parent.$el
                const getRestrictElement = shouldRestrictParentElement ? getParentRestrictElement : thisGetRestrictElement

                const restrictedX = Fp.restrictX(x, width, getRestrictElement)
                const restrictedY = Fp.restrictY(y, height, getRestrictElement)

                x = restrictedX
                y = restrictedY
            }

            this.updateProp('x', x)
            this.updateProp('y', y)

            this.updateProp('prevMouseMoveClientX', possibleClientX)
            this.updateProp('prevMouseMoveClientY', possibleClientY)
        }
    }
}