export const CreateProfilePage = () => {


    return (
        <div className="pageWrapper">
            <h1>Page for creating Profile</h1>
            <form action="submit">
                <input type="text" name="email" placeholder="email" />
                <input type="pasword" name="password" placeholder="password" />
                <input type="pasword" name="repeat-password" placeholder="repeat-password" />
                <button>Create a profile</button>
            </form>
        </div>
    );
}