import 'package:flutter/material.dart';

class ProfileManagementPage extends StatefulWidget {
  @override
  _ProfileManagementPageState createState() => _ProfileManagementPageState();
}

class _ProfileManagementPageState extends State<ProfileManagementPage> {
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  String _previousUsername = '';
  String _previousPassword = '';

  @override
  void initState() {
    super.initState();
    _previousUsername = _usernameController.text;
    _previousPassword = _passwordController.text;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Profile Management'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: ListView(
          children: <Widget>[
            _buildProfilePhotoSection(),
            SizedBox(height: 20),
            _buildUsernameSection(),
            SizedBox(height: 20),
            _buildPasswordSection(),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                _saveChanges(context);
              },
              child: Text('Save Changes'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildProfilePhotoSection() {
    return Center(
      child: Column(
        children: <Widget>[
          CircleAvatar(
            radius: 50,
            backgroundImage: NetworkImage(
                'https://via.placeholder.com/150'), // Replace with actual image
            backgroundColor: Colors.transparent,
          ),
          TextButton(
            onPressed: () {
              // Implement profile photo change functionality
            },
            child: Text('Change Profile Photo'),
          ),
        ],
      ),
    );
  }

  Widget _buildUsernameSection() {
    return TextField(
      controller: _usernameController,
      decoration: InputDecoration(
        labelText: 'Username',
        border: OutlineInputBorder(),
      ),
    );
  }

  Widget _buildPasswordSection() {
    return TextField(
      controller: _passwordController,
      decoration: InputDecoration(
        labelText: 'Password',
        border: OutlineInputBorder(),
      ),
      obscureText: true,
    );
  }

  void _saveChanges(BuildContext context) {
    String newUsername = _usernameController.text;
    String newPassword = _passwordController.text;

    if (newUsername != _previousUsername || newPassword != _previousPassword) {
      setState(() {
        _previousUsername = newUsername;
        _previousPassword = newPassword;
      });

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Changes saved successfully!'),
          duration: Duration(seconds: 2),
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('No changes made.'),
          duration: Duration(seconds: 2),
        ),
      );
    }
  }
}
