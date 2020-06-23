interface Subject {
    signUp(observer:Observer):void
    signOff(observer:Observer):void
    alertObservers():void
}