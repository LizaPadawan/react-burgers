export const sendOrder = async (data, callback) => {
    const ingredients = data.map(item => item._id);

    const orderBurger = (ingredients) => {
        return fetch("https://norma.nomoreparties.space/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                ingredients,
            }),
        });
    }

    const response = await orderBurger(ingredients);
    if (response.ok) { 
        const json = await response.json();
        console.log("json=", json);
        callback(json.order.number);
    } else {
        alert(`Ошибка HTTP: ${response.status}`);
    }
}
