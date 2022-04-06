import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Image, TextInput, ImageBackground, TouchableHighlight, Alert, Dimensions, ScrollView } from 'react-native';
import Constants from 'expo-constants';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default class App extends Component {
    state = {
        topBarText: 'Feed',
        feedPageDisplay: 'block',
        postPageDisplay: 'none',
        accountPageDisplay: 'none',
        
        accountObjectArray: [],
        imageObjectArray: [],
        
        accountImageURI: '',
        accountName: '',
        
        currentAccount: {name: 'None', image: 'https://codehs.com/uploads/6d345710794a7dc2346cf2b2e0fd0ef1', num: 0},
        count: 0,
        postImageURI: '',
    };

    setPageState = (page) => {
        if (page === 'feedPageDisplay') {
            this.setState ({
                topBarText: 'Feed',
                feedPageDisplay: 'block',
                postPageDisplay: 'none',
                accountPageDisplay: 'none',
            });
            
        }
        else if (page === 'postPageDisplay') {
            this.setState ({
                topBarText: 'Post',
                feedPageDisplay: 'none',
                postPageDisplay: 'block',
                accountPageDisplay: 'none',
            });
        }
        else if (page === 'accountPageDisplay') {
            this.setState ({
                topBarText: 'Accounts',
                feedPageDisplay: 'none',
                postPageDisplay: 'none',
                accountPageDisplay: 'block',
            });
        }
    }

    handleTextChangeAccountImg = accountImageURI => {
        this.setState({ accountImageURI });
    }

    handleTextChangeAccountName = accountName => {
        this.setState({ accountName });
    }

    handleCreateNewAccount = (accountImage, accountName) => {

        this.state.accountObjectArray.push({image: accountImage, name: accountName, num: this.state.count})
        this.setState({
            currentAccount: this.state.accountObjectArray[this.state.count],
            count: this.state.count + 1,
        })
    }

    handleSelectAccount = (accountNum) => {
        this.setState({
            currentAccount: this.state.accountObjectArray[accountNum],
        })
        
    }
    
    handlePostImage = (accountPic, accountName, URI) => {
        this.state.imageObjectArray.push({uploaderUserPic: accountPic, uploaderName: accountName, imageURI: URI, likeCount: 0,})
    }

    handlePostImageURITextChange = postImageURI => {
        this.setState({ postImageURI });
    };
    
    handleLikePress = (post) => {
        post.likeCount = post.likeCount + 1;
    }

    render() {
        return (
            <View style={styles.container}>
                
                <View style={styles.topBarContainer}>
                    <Text style={styles.topBarText}>
                        {this.state.topBarText}
                    </Text>
                </View>
                
                <View style={{ display: this.state.feedPageDisplay}}>
                    <View style={styles.bodyContainer}>
                        <ScrollView>
                            <View style={styles.feedObjectContainer}>
                                {this.state.imageObjectArray.map((post) => (
                                    <View style={styles.postContainer}>
                                        <View style={styles.postAccountContainer}>
                                            <View style={styles.postAccountImageContainer}>
                                                <Image
                                                    source={{ uri: post.uploaderUserPic }}
                                                    style={{ height: 35, width: 35}}
                                                />
                                            </View>
                                            <View style={styles.postAccountNameContainer}>
                                                <Text style={styles.paragraph}>
                                                    {post.uploaderName}
                                                </Text>
                                            </View>
                                        
                                        </View>
                                        <View style={styles.postImageContainer}>
                                            <Image
                                                source={{ uri: post.imageURI }}
                                                style={{ height: 250, width: deviceWidth/1.1}}
                                            />
                                        </View>
                                        <View style={styles.postLikesContainer}>
                                            <TouchableHighlight style={styles.likeButton}
                                                onPress={() => this.handleLikePress(post)}
                                            >
                                                <Image
                                                    source={{ uri: 'https://codehs.com/uploads/6ac799fe7162a7769b7cbe5854f7a85f' }}
                                                    style={{ height: 25, width: 25 }}
                                                />
                                            </TouchableHighlight>
                                            <Text style={styles.likeNumber}>
                                                {'Likes: ' + post.likeCount}
                                            </Text>
                                        </View>
                                    </View>
                                 ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>

                <View style={{ display: this.state.postPageDisplay}}>
                    <View style={styles.bodyContainer}>
                        <View style={styles.postCurrentUserContainer}>
                            <View style={styles.activeAccountTextContainer}>
                                <Text style={styles.activeAccountText}>
                                    Active Account:
                                </Text>
                            </View>
                            <View style={styles.postAccountMemberContainer}>
                                <View style={styles.accountMemberImageContainer}>
                                    <Image
                                        source={{ uri: this.state.currentAccount.image }}
                                        style={styles.accountMemberImage}
                                    />
                                </View>
                                <View style={styles.accountMemberNameContainer}>
                                    <Text style={styles.accountMemberNameText}>
                                    {this.state.currentAccount.name}
                                    </Text>
                                </View>
                            </View>
                        
                        </View>
                        <View style={styles.postInputContainer}>
                            <Text style={styles.textInputLabel}>
                            Image URI:
                            </Text>
                            <TextInput
                                value={this.state.postImageURI}
                                onChangeText={this.handlePostImageURITextChange}
                                style={styles.postTextInput}
                            />
                            <TouchableHighlight style={styles.postButton}
                                onPress={() => this.handlePostImage(this.state.currentAccount.image, this.state.currentAccount.name, this.state.postImageURI)}
                            >
                                <Text style={styles.buttonText}>
                                Post Image
                                </Text>
                            
                            </TouchableHighlight>
                        
                        </View>
                    
                    </View>
                </View>
                        
                <View style={{ display: this.state.accountPageDisplay}}>
                    <View style={styles.bodyContainer}>
                        
                        <View style={styles.existingAccountContainer}>
                            <View style={styles.existingAccountTextContainer}>
                                <Text style={styles.existingAccountText}>
                                    Choose Existing Account:
                                </Text>
                            </View>

                            <View style={styles.chooseAccountContainer}>
                                <ScrollView>
                                {this.state.accountObjectArray.map((account) => (
                                    <View style={styles.accountMemberContainer}>
                                        <View style={styles.accountMemberImageContainer}>
                                            <Image
                                                source={{ uri: account.image }}
                                                style={styles.accountMemberImage}
                                            />
                                        </View>
                                        <View style={styles.accountMemberNameContainer}>
                                            <Text style={styles.accountMemberNameText}>
                                            {account.name}
                                            </Text>
                                        </View>
                                        <TouchableHighlight style={styles.accountMemberButton}
                                            onPress={() => this.handleSelectAccount(account.num)}
                                        >
                                            <Text style={styles.buttonText}>
                                            Select
                                            </Text>
                                        
                                        </TouchableHighlight>
                                    </View>
                                ))}
                                </ScrollView>
                            </View>
                            
                        </View>
                        
                        <View style={styles.activeAccountTextContainer}>
                            <Text style={styles.activeAccountText}>
                                {'Active Account: ' + this.state.currentAccount.name}
                            </Text>
                        </View>
                        <View style={styles.createAccountContainer}>
                            
                            
                            <Text style={styles.textInputLabel}>
                            New Account Image URI:
                            </Text>
                        
                            <TextInput
                                value={this.state.accountImageURI}
                                onChangeText={this.handleTextChangeAccountImg}
                                style={styles.textInput}
                            />
                            <Text style={styles.textInputLabel}>
                            New Account Name:
                            </Text>
                            
                            <TextInput
                                value={this.state.accountName}
                                onChangeText={this.handleTextChangeAccountName}
                                style={styles.textInput}
                            />
                            <TouchableHighlight style={styles.createAccountButton}
                                onPress={() => this.handleCreateNewAccount(this.state.accountImageURI, this.state.accountName)}
                            >
                                <Text style={styles.buttonText}>
                                    Create New Account
                                </Text>
                            
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                    
                
                
                <View style={styles.navBarContainer}>
                    <TouchableHighlight style={styles.navBarButton}
                        onPress={() => this.setPageState('feedPageDisplay')}
                    >
                        <Text style={styles.buttonText}>
                            Feed
                        </Text>
                    
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.navBarButton}
                        onPress={() => this.setPageState('postPageDisplay')}
                    >
                        <Text style={styles.buttonText}>
                            Post
                        </Text>
                    
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.navBarButton}
                        onPress={() => this.setPageState('accountPageDisplay')}
                    >
                        <Text style={styles.buttonText}>
                            Account
                        </Text>
                    
                    </TouchableHighlight>
                
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: deviceHeight,
        width: deviceWidth,
        backgroundColor: '#444B55',
    },
    
    //Main Containers
    topBarContainer: {
        height: deviceHeight/ 10,
        width: deviceWidth,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2e3339',
        borderBottomRightRadius: '5px',
        borderBottomLeftRadius: '5px'
    },
    bodyContainer: {
        height: 8 * (deviceHeight/ 10),
        width: deviceWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },

    navBarContainer: {
        height: deviceHeight/ 10,
        width: deviceWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2e3339',
    },
    
    //topBar
    topBarText:{
        color: 'white',
    },
    
    //body
    //Feed
    postContainer: {
        marginBottom: '5px',
        border: '1px solid white',
        borderRadius: '10px',
    },
    postAccountContainer: {
        height: '40px',
        width: deviceWidth/1.1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopRightRadius: '10px',
        borderTopLeftRadius: '10px',
    },
    postLikesContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomRightRadius: '10px',
        borderBottomLeftRadius: '10px',
    },
    likeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2.5px',
    },
    
    //Post
    postCurrentUserContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: deviceWidth/1.1,
        height: '50px',
    },
    postAccountMemberContainer: {
        width: deviceWidth / 1.1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: '5px',
    },
    postInputContainer: {
        flex: 4,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid white',
        borderRadius: '5px',
        backgroundColor: '#2e3339',
        marginBottom: '10px',
    },
    postTextInput: {
        width: deviceWidth/1.5,
        height: '25px',
        color: 'black',
        fontSize: '21px',
        backgroundColor: 'white',
    },
    postButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '40px',
        width: '100px',
        backgroundColor:  '#F85E2B',
        borderRadius: '5px',
        marginTop: 10,
    },
    
    //Accounts
    existingAccountContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    existingAccountTextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chooseAccountContainer: {
        flex: 9,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: deviceWidth/1.1,
        border: '1px solid white',
        borderRadius: '5px',
        backgroundColor: '#2e3339',
    },
    
    //Account Profiles
    accountMemberContainer: {
        height: '40px',
        width: deviceWidth/1.2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        margin: '3px',
        borderRadius: '3px',
        flexDirection: 'row',
    },
    accountMemberImageContainer: {
        flex: 1,
    },
    accountMemberImage: {
        width: 40,
        height: 40,
    },
    accountMemberNameContainer: {
        flex: 4,
    },
    accountMemberNameText: {
        fontSize: 20,
    },
    accountMemberButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F85E2B',
        height: '90%',
        width: '90%',
        margin: '2.5px',
        borderRadius: '7px',
    },
    activeAccountTextContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F85E2B',
        height: '20px',
        width: deviceWidth / 1.1,
        borderRadius: '5px',
    },
    activeAccountText: {
        color: 'white',
    },
    createAccountContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    existingAccountText: {
        color: 'white',
    },
    createAccountButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '40px',
        width: '100px',
        backgroundColor:  '#F85E2B',
        borderRadius: '5px',
        marginTop: 10,
    },
    
    //navBar
    navBarButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '80%',
        width: deviceWidth/3.5,
        margin: '5px',
        borderRadius: '5px',
        backgroundColor: '#F85E2B',
    },
    
    //General Multi Use Styles
    textInputLabel: {
        color: 'white',
        marginTop: 10,
        marginBottom: 2.5,
    },
    textInput: {
        width: deviceWidth/1.5,
        height: '25px',
        color: 'white',
        fontSize: '21px',
        backgroundColor: '#2e3339',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});