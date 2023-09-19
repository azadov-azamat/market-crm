import {Button, Card, CardBody, Typography,} from "@material-tailwind/react";
import * as InputComponent from "../../components/inputs"
import {useNavigate} from "react-router-dom";

export default function SignIn() {
    const navigate = useNavigate()

    return (
        <div className={'w-full h-screen flex justify-center items-center'}>
            <Card color="white" shadow={true}>
                <CardBody>
                    <Typography variant="h4" color="blue-gray">
                        Xush kelibsiz
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Ma'muriyat tomonidan berilgan ma'lumotlaringizni kiriting
                    </Typography>
                    <form className="mt-8 mb-2 w-full max-w-screen-lg sm:w-96">
                        <div className="mb-4 flex flex-col gap-6">
                            <InputComponent.PhoneNumber/>
                            <InputComponent.Password/>
                        </div>
                        <Button className="mt-6" fullWidth onClick={()=> navigate('/magazines')}>
                            Kirish
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>

    );
}