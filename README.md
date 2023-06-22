# mesto-react

      
      
      <section className="popup" id="popup-edit">
        <div className="popup__container">
          <button className="popup__close" type="button"></button>
          <h2 className="popup__title">Редактировать профиль</h2>
          <form className="popup__form" name="popup-form" id="form-edit" noValidate>
            <label className="popup__label">
              <input className="popup__input popup__input_subject_name" id="name-input" name="name" placeholder="Имя"
                     required minLength="2" maxLength="40"></input>
                <span className="popup__input-error name-input-error"></span>
            </label>
            <label className="popup__label">
              <input className="popup__input popup__input_subject_description" id="description-input" name="description"
                     placeholder="Вид деятельности" required minLength="2" maxLength="200"></input>
                <span className="popup__input-error description-input-error"></span>
            </label>
            <button className="popup__save-button popup__save-button_inactive" type="submit">Сохранить</button>
          </form>