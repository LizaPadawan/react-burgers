import commonStyles from "../common.module.css";

export function Error() {
  
    return (
      <div className={commonStyles.content_panel}>
      <div className="text text_type_main-large pt-10">
        Страница не существует 
      </div>
      </div>
    );
  }
  