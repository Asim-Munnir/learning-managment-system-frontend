import { AppWindowIcon, CodeIcon, Loader2 } from "lucide-react"







// password: ZoK3yKloQ43Pjrwv
// username: asimmunnir1_db_user

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" })
    const [loginInput, setLoginInput] = useState({ email: "", password: "" })

    const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] = useRegisterUserMutation()
    const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] = useLoginUserMutation()

    const navigate = useNavigate()

    const changeInputHandler = (e, type) => {
        const { name, value } = e.target;
        if (type === "signup") {
            setSignupInput({ ...signupInput, [name]: value })
        } else {
            setLoginInput({ ...loginInput, [name]: value })
        }
    }

    const handleRegistration = async (type) => {
        const inputData = type === "signup" ? signupInput : loginInput
        const action = type === "signup" ? registerUser : loginUser
        await action(inputData)
    }

    useEffect(() => {
        if (registerIsSuccess && registerData) {
            toast.success(registerData.message || "Signup Successfully...!")
        }

        if (registerError) {
            toast.error(registerError?.data?.message || "Something went wrong, Signup Failed");
        }

        if (loginIsSuccess && loginData) {
            toast.success(loginData.message || "Login Successfully...!");
            navigate("/")
        }

        if (loginError) {
            toast.error(loginError?.data?.message || "Something went wrong, Login Failed");
        }

    }, [registerIsLoading, loginIsSuccess, loginIsLoading, loginData, registerData, loginError, registerError])

    return (
        <div className="flex items-center w-full justify-center mt-20">

            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>

                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Signup</CardTitle>
                            <CardDescription>
                                Create a new account and click signup when you're done.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-2">

                            <div className="space-y-1">
                                <Label htmlFor="tabs-demo-name">Name</Label>
                                <Input
                                    type="text"
                                    placeholder="Eg. xyz"
                                    name="name"
                                    value={signupInput.name}
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                    required={true} />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="tabs-demo-name">Email</Label>
                                <Input type="email"
                                    placeholder="xyz@gmail.com"
                                    name="email"
                                    value={signupInput.email}
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="tabs-demo-username">Password</Label>
                                <Input type="password"
                                    placeholder="Eg-xyz"
                                    name="password"
                                    value={signupInput.password}
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                    required={true} />
                            </div>

                        </CardContent>

                        <CardFooter>
                            <Button disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>
                                {
                                    registerIsLoading ? (
                                        <>
                                            <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please Wait
                                        </>
                                    ) : "Sign Up"
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Login your account here. After signup, you'll be logged in.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="tabs-demo-current">Email</Label>
                                <Input
                                    type="email"
                                    placeholder="xyz@gmail.com"
                                    name="email"
                                    value={loginInput.email}
                                    onChange={(e) => changeInputHandler(e, "login")}
                                    required={true} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="tabs-demo-new">Password</Label>
                                <Input
                                    type="password"
                                    placeholder="xyz"
                                    name="password"
                                    value={loginInput.password}
                                    onChange={(e) => changeInputHandler(e, "login")}
                                    required={true} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={loginIsLoading} onClick={() => handleRegistration("login")}>
                                {
                                    loginIsLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                                        </>
                                    ) : "Login"
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>


        </div>

    )
}

export default Login