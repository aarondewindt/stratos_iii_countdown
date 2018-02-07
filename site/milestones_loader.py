from traceback import format_exc
try:
    import os
    from apiclient import discovery
    from dateutil.parser import parse as datetime_parse


    def main():
        """Shows basic usage of the Sheets API.

        Creates a Sheets API service object and prints the names and majors of
        students in a sample spreadsheet:
        https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
        """
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

