import Person from "./Person";
function App() {
    return (
        <div className="container">
            <Person source="https://picsum.photos/400/300?random=14" name="Divya" email="divya@wscubetech.com" age="19" />

            <Person source="https://picsum.photos/400/300?random=31" name="Bhagirath" email="bhagirath@wscubetech.com" age="19" />

            <Person source="https://picsum.photos/400/300?random=12" name="Nikita" email="nikita@wscubetech.com" age="70" />

            <Person source="https://picsum.photos/400/300?random=13" name="Rahul" email="rahul@wscubetech.com" age="80" />
        </div>
    )
}

export default App;