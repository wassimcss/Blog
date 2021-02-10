import React from 'react'
import { Route, Switch } from 'react-router'

import { ActivationEmail } from './auth/ActivationEmail'

import { ForgotPassword } from './auth/ForgotPassword'
import { Login } from './auth/Login'
import { LoginAdmin } from './auth/LoginAdmin'
import Register from './auth/Register'
import { ResetPassword } from './auth/ResetPassword'
import { FollowedPosts } from './posts/FollowedPosts'
import { Posts } from './posts/Posts'
import {Profile} from './profile/Profile'
import { UserProfile } from './profile/UserProfile'


export const Body = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/admin" component={LoginAdmin} />
                <Route exact path="/forgot" component={ForgotPassword}/>
                <Route exact path="/user/reset/:token" component={ResetPassword}/>
                <Route exact path="/user/activate/:activation_token" component={ActivationEmail}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/posts" component={Posts}/>
                <Route exact path="/followed_posts" component={FollowedPosts}/>
                <Route exact path="/user_profile/:id" component={UserProfile}/>
            </Switch>
        </div>
    )
}
