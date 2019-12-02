using OjVolunteer.Model;
using OjVolunteer.Model.Param;
using OjVolunteer.Model.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OjVolunteer.IBLL
{
    public partial interface IUserIDcardService
    {

        bool AddCard(UserIDcard card);
    }
}
