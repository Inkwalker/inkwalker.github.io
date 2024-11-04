(function (global) {
    const AirDropModal = {
        dialog: null,
        form: null,
        data: null,
        openDialog: function () {
            const dialog = this.dialog;
            dialog.showModal();
        },
        init: function () {
            this.dialog = document.querySelector('#airdrop-modal');
            this.form = document.querySelector('#airdrop-form');
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
        },
        closeDialog: function () {
            const dialog = this.dialog;
            dialog.close();
        },
        handleSubmit: function (event) {
            event.preventDefault();
            this.closeDialog();
            const formData = new FormData(this.form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            this.data = data;
            console.log('address: ', this.data);
        },
    }

    global.AirDropModal = AirDropModal;
})(window);
