from traceback import format_exc
home_dir = "/home/daresimserver"
try:
    import httplib2
    import os

    from apiclient import discovery
    from oauth2client import client
    from oauth2client import tools
    from oauth2client.file import Storage

    from dateutil.parser import parse as datetime_parse

    try:
        import argparse
        flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
    except ImportError:
        flags = None

    # If modifying these scopes, delete your previously saved credentials
    # at ~/.credentials/sheets.googleapis.com-python-quickstart.json
    SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly'
    CLIENT_SECRET_FILE = os.path.join(home_dir, '.stratos/secret.json')
    APPLICATION_NAME = 'Google Sheets API Python Quickstart'

    print(CLIENT_SECRET_FILE)

    def get_credentials():
        """Gets valid user credentials from storage.

        If nothing has been stored, or if the stored credentials are invalid,
        the OAuth2 flow is completed to obtain the new credentials.

        Returns:
            Credentials, the obtained credential.
        """
        credential_dir = os.path.join(home_dir, '.credentials')
        if not os.path.exists(credential_dir):
            os.makedirs(credential_dir)
        credential_path = os.path.join(credential_dir,
                                       'sheets.googleapis.com-python-quickstart.json')

        store = Storage(credential_path)
        credentials = store.get()
        if not credentials or credentials.invalid:
            flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, SCOPES)
            flow.user_agent = APPLICATION_NAME
            if flags:
                credentials = tools.run_flow(flow, store, flags)
            else: # Needed only for compatibility with Python 2.6
                credentials = tools.run(flow, store)
            print('Storing credentials to ' + credential_path)
        return credentials


    def main():
        """Shows basic usage of the Sheets API.

        Creates a Sheets API service object and prints the names and majors of
        students in a sample spreadsheet:
        https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
        """
        #credentials = get_credentials()
        #http = credentials.authorize(httplib2.Http())
        discoveryUrl = ('https://sheets.googleapis.com/$discovery/rest?'
                        'version=v4')
        service = discovery.build('sheets', 'v4', developerKey="AIzaSyCZ41Zj4_eChwYANXzbDBajEWX8dt3a2Ao",
                                  discoveryServiceUrl=discoveryUrl)

        spreadsheetId = '1zcCmtkVP4Hjy5uDuN4veMTqYquMRcF-82mMt2kRhnmU'
        rangeName = 'Sheet1!A2:E'
        result = service.spreadsheets().values().get(
            spreadsheetId=spreadsheetId, range=rangeName).execute()
        values = result.get('values', [])

        if not values:
            print('No data found.')
        else:
            for row in fix_rows(values):
                row[0] = datetime_parse(row[0])
                if row[2]:
                    row[2] = datetime_parse(row[2])
                print('new Milestone("{name}", "{deadline}", {remove}, {marker}, {shift}),'.format(
                    name=row[1],
                    deadline=row[0].strftime("%Y-%m-%d %H:%M"),
                    remove=row[2].strftime('"%Y-%m-%d %H:%M"') if row[2] else "undefined",
                    marker=f'{row[3]}' if row[3] else "undefined",
                    shift=f'{row[4]}' if row[4] else "undefined",
                ))


    def fix_rows(rows):
        yield from ([x if x != "" else None for x in row] + [None] * (5 - len(row)) for row in rows)



    if __name__ == '__main__':
        main()
except:
    print(format_exc())

